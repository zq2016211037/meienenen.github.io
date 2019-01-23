import React, { Component } from 'react';
import { Icon } from 'antd';

// const { Header } = Layout;

class NotFound extends Component {
    render() {
        return (
            <div className="NotFound center">
                <Icon type="frown" style={{fontSize:"56px", color:"#f2f2f2", textAlgin:"center", width:"100%",marginTop:"100px"}}/>
                <div style={{textAlign:"center",fontSize: "36px", color: "#eee",lineHeight:"56px"}}>404 Page! 页面走失</div>
            </div>
        );
    }
}

export default NotFound;
