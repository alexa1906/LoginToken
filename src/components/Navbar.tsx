import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Profile",
    key: "/profile",
    icon: <UserOutlined />,
  },
  {
    label: "Settings",
    key: "/settings",
    icon: <SettingOutlined />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // to not show on LoginPage
  const isLoginPage = location.pathname === "/";
  if (isLoginPage) {
    return null;
  }

  const onClick = (e: { key: string }) => {
    navigate(e.key);
  };
  

  return <Menu onClick={onClick} items={items} />;
};

export default Navbar;
