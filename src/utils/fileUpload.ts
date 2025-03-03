interface ChunkInfo {
  chunk: Blob;
  index: number;
  hash: string;
  progress: number;
  retries?: number;
}

interface UploadOptions {
  url: string;
  chunkSize?: number;
  concurrency?: number;
  maxRetries?: number;
  onProgress?: (progress: number) => void;
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
}

export class FileUploader {
  private readonly chunkSize: number;
  private readonly concurrency: number;
  private readonly maxRetries: number;
  private abortController: AbortController | null = null;
  private worker: Worker | null = null;

  constructor(
    options: {
      chunkSize?: number;
      concurrency?: number;
      maxRetries?: number;
    } = {}
  ) {
    this.chunkSize = options.chunkSize || 2 * 1024 * 1024; // 默认2MB
    this.concurrency = options.concurrency || 3; // 默认并发数3
    this.maxRetries = options.maxRetries || 3; // 默认最大重试次数3
    this.initWorker();
  }

  private initWorker() {
    if (typeof Worker !== "undefined" && !this.worker) {
      this.worker = new Worker(new URL("./uploadWorker.ts", import.meta.url), {
        type: "module",
      });
    }
  }

  private async calculateHashInWorker(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error("Web Worker不可用"));
        return;
      }

      const handleMessage = (e: MessageEvent) => {
        if (e.data.type === "hashResult") {
          this.worker?.removeEventListener("message", handleMessage);
          resolve(e.data.data);
        } else if (e.data.type === "error") {
          this.worker?.removeEventListener("message", handleMessage);
          reject(new Error(e.data.error));
        }
      };

      this.worker.addEventListener("message", handleMessage);
      // 计算文件的hash值
      this.worker.postMessage({ type: "calculateHash", file });
    });
  }

  private async createChunksInWorker(
    file: File
  ): Promise<{ index: number; start: number; end: number }[]> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error("Web Worker不可用"));
        return;
      }

      const handleMessage = (e: MessageEvent) => {
        if (e.data.type === "chunksResult") {
          this.worker?.removeEventListener("message", handleMessage);
          resolve(e.data.data);
        } else if (e.data.type === "error") {
          this.worker?.removeEventListener("message", handleMessage);
          reject(new Error(e.data.error));
        }
      };

      this.worker.addEventListener("message", handleMessage);
      this.worker.postMessage({
        type: "createChunks",
        file,
        chunkSize: this.chunkSize,
      });
    });
  }

  private async uploadChunkWithRetry(
    chunk: ChunkInfo,
    url: string
  ): Promise<void> {
    let retries = 0;
    while (retries <= this.maxRetries) {
      try {
        const formData = new FormData();
        formData.append("chunk", chunk.chunk);
        formData.append("index", chunk.index.toString());
        formData.append("hash", chunk.hash);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
          signal: this.abortController?.signal,
        });

        if (!response.ok) {
          throw new Error(`上传分片失败: ${response.statusText}`);
        }
        return;
      } catch (error) {
        retries++;
        chunk.retries = retries;
        if (retries > this.maxRetries) {
          throw error;
        }
        // 指数退避重试
        await new Promise((resolve) =>
          setTimeout(resolve, Math.min(1000 * Math.pow(2, retries), 10000))
        );
      }
    }
  }

  public async upload(file: File, options: UploadOptions): Promise<void> {
    try {
      this.abortController = new AbortController();
      const fileHash = await this.calculateHashInWorker(file);
      const chunkInfos = await this.createChunksInWorker(file);
      let completedChunks = 0;

      const chunks: ChunkInfo[] = chunkInfos.map(({ index, start, end }) => ({
        chunk: file.slice(start, end),
        index,
        hash: `${fileHash}-${index}`,
        progress: 0,
      }));

      const uploadTasks = chunks.map(async (chunk) => {
        try {
          await this.uploadChunkWithRetry(chunk, options.url);
          completedChunks++;
          chunk.progress = 100;

          if (options.onProgress) {
            const totalProgress = (completedChunks / chunks.length) * 100;
            options.onProgress(totalProgress);
          }
        } catch (error) {
          if (options.onError) {
            options.onError(error as Error);
          }
          throw error;
        }
      });

      // 控制并发数
      for (let i = 0; i < chunks.length; i += this.concurrency) {
        const currentTasks = uploadTasks.slice(i, i + this.concurrency);
        await Promise.all(currentTasks);
      }

      // 通知服务器所有分片上传完成
      const mergeResponse = await fetch(`${options.url}/merge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileHash,
          fileName: file.name,
          size: file.size,
        }),
      });

      if (!mergeResponse.ok) {
        throw new Error("文件合并失败");
      }

      if (options.onSuccess) {
        options.onSuccess(await mergeResponse.json());
      }
    } catch (error) {
      if (options.onError) {
        options.onError(error as Error);
      }
      throw error;
    }
  }

  public cancel(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  public destroy(): void {
    this.cancel();
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}
