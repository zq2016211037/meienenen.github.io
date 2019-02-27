import React from 'react';
import {
    Skeleton, Switch, Card, Layout, Icon, Avatar,
} from 'antd';
import LeftBar from "../common/leftbar/index";
import RightTop from "../common/rightTop/index";
const { Content } = Layout;
const { Meta } = Card;
class UserInfo extends React.Component {
    state = {
        collapsed: false,
        loading: true,
    };
    onChange = (checked) => {
        this.setState({ loading: !checked });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <Layout>
                <LeftBar></LeftBar>
                <Layout>
                    <RightTop></RightTop>
                    <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                    }}
                    >

                        <Switch checked={!loading} onChange={this.onChange} />

                        <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                            <Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title="Card title"
                                description="This is the description"
                            />
                        </Card>

                        <Card
                            style={{ width: 300, marginTop: 16 }}
                            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                        >
                            <Skeleton loading={loading} avatar active>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Skeleton>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default UserInfo;