import React,{Component} from 'react';
// import ReactDOM from "react-dom";
import { Menu,Layout, Icon } from 'antd';
import "../../../style/App.css";
import emitter from "../../../assets/events.js";
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
        this.eventEmitter = emitter.addListener("collapsed", (msg) => {
            this.setState({
                collapsed: msg
            })
        });
    }
    // 组件销毁前移除事件监听
    // componentWillUnmount() {
    //     emitter.removeListener(this.eventEmitter);
    // }
    render(){
        return(
            <div style={{height:"100%"}}>
                {/* <Affix offsetTop={this.state.top} style={{height:"100%"}}> */}
                   <Sider
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                            style={{height:"100%"}}
                        >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ minHeight:"500px"}}>
                                <Menu.Item key="1">
                                    <Icon type="user" />
                                    <span>最新发布</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="video-camera" />
                                    <span>个人博客</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="upload" />
                                    <span>联系他</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                {/* </Affix> */}
                
            </div>
        )
    }
}
export default LeftBar;

