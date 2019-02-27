import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import AdminHeader from '../../common/header';
import SideBar from '../../common/sidebar';

const { Content } = Layout;

class Cooperation extends Component {
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
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        合作伙伴
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default Cooperation;

