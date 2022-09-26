import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../css/Common.css";

export default function TopBar() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("email")))
  }, [])

  const onClickHandler = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  return (
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]} >
      <Menu.SubMenu
        key="SubMenu"
        title={"Welcome, "+username}
        icon={<SettingOutlined />}
      >
        <Menu.ItemGroup title="Action">
          <Menu.Item key="1"  icon={<AppstoreOutlined />} >
            <a onClick={onClickHandler}>Logout</a>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
}
