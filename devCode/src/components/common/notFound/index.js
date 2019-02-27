import React, { Component } from 'react';
import emitter from "../../../assets/events.js";

class NotFound extends Component {
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
                404页面
            </div>
        )
    }
}
export default NotFound;

