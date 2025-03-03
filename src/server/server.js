import path from "path";
import express from "express";
import process from "process"; // 使用 import 引入 process 模块
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import fs from "fs/promises";

const PORT = process.env.PORT || 5000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置文件上传中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置静态文件服务
app.use(express.static(path.join(__dirname, "../../dist")));

// 配置multer中间件
const upload = multer({
  storage: multer.diskStorage({
    destination: async function (req, file, cb) {
      const uploadDir = path.join(__dirname, "../../uploads/temp");
      try {
        await fs.mkdir(uploadDir, { recursive: true });
        cb(null, uploadDir);
      } catch (error) {
        cb(error);
      }
    },
    filename: function (req, file, cb) {
      const chunkHash = req.body.hash;
      cb(null, `${chunkHash}`);
    },
  }),
});

// API routes
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello from Express!" });
});

// 文件分片上传接口
app.post("/api/upload", upload.single("chunk"), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("没有接收到文件");
    }
    res.status(200).json({ message: "分片上传成功" });
  } catch (error) {
    res.status(500).json({ message: "文件上传失败", error: error.message });
  }
});

// 文件合并接口
app.post("/api/upload/merge", async (req, res) => {
  try {
    const { fileHash, fileName } = req.body;
    const chunksDir = path.join(__dirname, "../../uploads/temp");
    const uploadDir = path.join(__dirname, "../../uploads");

    // 确保目标目录存在
    await fs.mkdir(uploadDir, { recursive: true });

    // 获取所有分片
    const chunks = await fs.readdir(chunksDir);
    const filteredChunks = chunks.filter((chunk) => chunk.startsWith(fileHash));

    // 按照索引排序分片
    filteredChunks.sort((a, b) => {
      const indexA = parseInt(a.split("-")[1]);
      const indexB = parseInt(b.split("-")[1]);
      return indexA - indexB;
    });

    // 合并文件
    const filePath = path.join(uploadDir, fileName);
    const writeStream = fs.createWriteStream(filePath);

    for (const chunk of filteredChunks) {
      const chunkPath = path.join(chunksDir, chunk);
      const chunkData = await fs.readFile(chunkPath);
      await new Promise((resolve, reject) => {
        writeStream.write(chunkData, (error) => {
          if (error) reject(error);
          resolve();
        });
      });
      // 删除分片
      await fs.unlink(chunkPath);
    }

    writeStream.end();
    res
      .status(200)
      .json({ message: "文件合并成功", url: `/uploads/${fileName}` });
  } catch (error) {
    res.status(500).json({ message: "文件合并失败", error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
