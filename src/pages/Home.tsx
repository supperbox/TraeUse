import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">欢迎来到首页</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">这是一个使用 React + Vite + TypeScript 构建的应用。</p>
      </div>
    </div>
  );
};

export default Home;