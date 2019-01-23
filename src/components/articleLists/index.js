import React from 'react';
import {
     Layout,Pagination
} from 'antd';
import LeftBar from "../common/leftbar/index";
import RightTop from "../common/rightTop/index";
import ArticleItem from "../articleLists/articleItem/index"
import "../../style/article/index.less";
import Event from '../../assets/events.js';
const { Content } = Layout;
class ArticleDetals extends React.Component {
    state = {
        collapsed: false,
        loading: true,
        current: 1,
        total: 0
    };
    componentDidMount(){
        Event.on('total', data => {
            this.setState({
                total: parseInt(data)
            })
        })
    }
    onChange = (page)=>{
        Event.emit('curpage',page);
    }
    render() {
        return (
        <Layout>
            <LeftBar></LeftBar>
            <Layout>
                <RightTop></RightTop>
                <Content style={{
                    margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                }}
                >     
                <ArticleItem></ArticleItem>
                <Pagination defaultCurrent={1} total={this.state.total} pageSize={2} onChange={this.onChange}/>
                </Content>
            </Layout>
        </Layout>
        );
    }
}

export default ArticleDetals;