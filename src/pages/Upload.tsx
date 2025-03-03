import { FC, useState } from "react";
import { Upload, Button, Progress, message } from "antd";
import { UploadOutlined } from "@ant-design/icons"; // 确保路径正确以解决模块找不到的问题
import axios from "axios";
import { FileUploader } from "../utils/fileUpload";
import type { UploadFile } from "antd/es/upload/interface";

const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    message.error(error.response?.data?.message || "请求失败");
    return Promise.reject(error);
  }
);

const UploadPage: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploader] = useState(() => new FileUploader());

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      await uploader.upload(file, {
        url: "/api/upload",
        onProgress: (progress) => {
          setProgress(Math.round(progress));
        },
        onSuccess: () => {
          message.success("文件上传成功");
          setFileList([]);
        },
        onError: (error) => {
          message.error(`文件上传失败: ${error.message}`);
        },
      });
    } catch (error) {
      message.error("文件上传失败");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      setFileList([{ uid: "-1", name: file.name, status: "uploading" }]);
      handleUpload(file);
      return false;
    },
    fileList,
    onRemove: () => {
      setFileList([]);
      setProgress(0);
      uploader.cancel();
    },
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">文件上传</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={uploading}>
            选择文件
          </Button>
        </Upload>
        {progress > 0 && (
          <div className="mt-4">
            <Progress percent={progress} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
