import React from 'react';
import { Layout, Icon, Menu, Row,Col } from 'antd';
import {NavLink} from 'react-router-dom';
import "../../style/front/common.css";
import LeftBar from "../common/protal/leftbar/index";
// import RightTop from "../common/rightTop/index";
const { Header, Sider, Content } = Layout;

// const { Content } = Layout;

class Protal extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <LeftBar></LeftBar>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <Row>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Protal;