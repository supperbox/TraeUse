import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import UploadPage from "./pages/Upload";
import "./App.css";

const App: FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      label: "首页",
    },
    {
      key: "/info",
      label: "信息",
    },
    {
      key: "/upload",
      label: "文件上传",
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4">
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => handleMenuClick(key)}
            className="border-none"
          />
        </div>
      </div>
      <div className="pt-16 max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
