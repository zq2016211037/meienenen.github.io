import React,{Component} from 'react';
import { Menu,Layout, Icon } from 'antd';
import {NavLink} from 'react-router-dom';
import "../../../../style/front/common.css";
const {Sider} = Layout

class LeftBar extends Component {
    state = {
        top: 10,
        bottom: 10,
        collapsed: false,
    }
    toManageBlogs= function(){ 
        this.$router.push('./manageBlogs');
    }
    componentDidMount() {
    }
    render(){
        return(
            <div style={{height:"100%"}}>
                <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{height:"100%"}}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    <span> 
                    <NavLink to="/articleLists">文章列表</NavLink>
                    </span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span>私信我</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>
                    <NavLink to="/writeArticle">编辑文章</NavLink>
                    </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Icon type="upload" />
                    <span>
                    <NavLink to="/uploadArticle">上传文章</NavLink>
                    </span>
                </Menu.Item>
                </Menu>
                </Sider> 
            </div>
        )
    }
}
export default LeftBar;

