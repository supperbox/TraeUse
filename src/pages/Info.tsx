import { FC } from 'react';

const Info: FC = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">信息页面</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">关于我们</h2>
            <p className="text-gray-600">我们是一个充满激情的技术团队，致力于创造优秀的用户体验。</p>
          </div>
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">联系方式</h2>
            <p className="text-gray-600">邮箱：contact@example.com</p>
            <p className="text-gray-600">电话：(+86) 123-4567-890</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">地址</h2>
            <p className="text-gray-600">中国北京市朝阳区科技园区88号</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;