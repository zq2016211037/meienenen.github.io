import React, { Component } from 'react';
// import ReactDOM from "react-dom";
import {Icon,Layout } from 'antd';
import emitter from "../../../assets/events.js";
const { Header } = Layout;

class LeftTop extends Component {
    state = {
        collapsed: true,
    };

    toggle = () => {
        emitter.emit("collapsed", this.state.collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    // isCollapsed = (msg) => {
    //     return () => {
    //         // 触发自定义事件
    //         emitter.emit("collapsed", this.state.collapsed);
    //     }
    // }
    render() {
        return (
            <div>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </Header>

            </div>
        )
    }
}
export default LeftTop;

