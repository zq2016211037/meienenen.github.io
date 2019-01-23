import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Link} from "react-router-dom";
import "../../../style/front/common.css";
const { SubMenu } = Menu;
const { Sider } = Layout;

class SideBar extends Component {
    toManageBlogs = function () {
        this.$router.push('./manageBlogs');
    }
    render() {
      return (
         <div className="SideBar">
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" onClick="changeBrand" title={<span><Icon type="user" />用户管理</span>}>
                        <Menu.Item key="1">用户列表</Menu.Item>
                        <Menu.Item key="2">消息</Menu.Item>
                        <Menu.Item key="3">权限管理</Menu.Item>
                        {/* <Menu.Item key="4">option4</Menu.Item>  */}
                    </SubMenu>
                    <SubMenu key="sub2" onClick="changeBrand" title={<span><Icon type="laptop" /><Link to="">博客管理</Link></span>}>
                        <Menu.Item key="5">博客列表</Menu.Item>
                        <Menu.Item key="6">博客管理</Menu.Item>
                        <Menu.Item key="7">添加博客</Menu.Item>
                        {/* <Menu.Item key="8"></Menu.Item> */}
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="notification" />草稿</span>}>
                        <Menu.Item key="9">草稿列表</Menu.Item>
                        <Menu.Item key="10">分类管理</Menu.Item>
                        {/* <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item> */}
                    </SubMenu>
                </Menu>
            </Sider>
      </div>
      );
  }
}

export default SideBar;
