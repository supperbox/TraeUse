type WorkerMessage = {
  type: 'calculateHash' | 'createChunks';
  file: File;
  chunkSize?: number;
};

type WorkerResponse = {
  type: 'hashResult' | 'chunksResult' | 'error';
  data: any;
  error?: string;
};

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, file, chunkSize = 2 * 1024 * 1024 } = e.data;

  try {
    switch (type) {
      case 'calculateHash':
        const hash = await calculateHash(file);
        self.postMessage({ type: 'hashResult', data: hash });
        break;
      case 'createChunks':
        const chunks = createChunks(file, chunkSize);
        self.postMessage({ type: 'chunksResult', data: chunks });
        break;
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      data: null, 
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
};

async function calculateHash(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const hash = Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      resolve(hash);
    };
    reader.readAsArrayBuffer(file.slice(0, 1024));
  });
}

function createChunks(file: File, chunkSize: number): { index: number; start: number; end: number }[] {
  const chunks = [];
  let start = 0;

  while (start < file.size) {
    const end = Math.min(start + chunkSize, file.size);
    chunks.push({
      index: chunks.length,
      start,
      end
    });
    start = end;
  }

  return chunks;
}