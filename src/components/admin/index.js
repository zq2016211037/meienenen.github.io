import React,{Component} from 'react';
// import ReactDOM from "react-dom";
import { Layout, Breadcrumb} from 'antd';
import $ from 'jquery';
import "../../style/admin/index.css";
import AdminHeader from './common/header';
import SideBar from './common/sidebar';

const { Content} = Layout;

class Admin extends Component {
    toManageBlogs= function(){ 
        this.$router.push('./manageBlogs');
    }
    render(){
        return(
            <Layout>
                <AdminHeader/>
                <Layout>
                    <SideBar/>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default Admin;

