import React, { Component } from 'react';
// import ReactDOM from "react-dom";
// import $ from 'jquery';
import { Layout, Breadcrumb } from 'antd';
import AdminHeader from '../common/header';
import SideBar from '../common/sidebar';
import "../../../style/admin/index.css";
import BlogLists from "./bloglists/index"
const { Content } = Layout;

class UserInfo extends Component {
    render() {
        return (
        <Layout>
            <AdminHeader />
            <Layout>
                <SideBar />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>blog</Breadcrumb.Item>
                    <Breadcrumb.Item>博客管理</Breadcrumb.Item>
                    <Breadcrumb.Item>博客列表</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{
                    background: '#fff', padding: 24, margin: 0, minHeight: 280,height:'100%',
                }}
                >
                <BlogLists></BlogLists>
                </Content>
            </Layout>
         </Layout>
        </Layout>
        )
    }
}
export default UserInfo;

