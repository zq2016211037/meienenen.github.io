import React, {Component} from "react";
import {Link,withRouter} from 'react-router-dom';
// import {hashHistory} from 'react-router';
import {
    List, message, Avatar, Spin,Button
} from 'antd';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import Event from '../../../assets/events.js';


class ArticleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userLists: [],
          pages: '',
          page: '',
          limit: '',
          count: '',
          loading: false,
          // currentPage: 1
        }
    }
    componentDidMount() {
      Event.on('curpage',data =>{
        this.fetchData(data);
      })
      this.fetchData(1);
    }
  
    fetchData = (page) => {
      console.log(this.state.currentPage);
      var that = this;
      // alert(this.state.currentPage);
        var url ="http://localhost:8003/front/getBlogLists?page="+page;
        this.blogsRes = fetch(url,{
            method: 'GET',
            mode: 'cors',
        }).then(res => {
            console.log(res);
            return res.json();
        }).then(json => {
            console.log('获取的结果', json);
            this.setState({
                articles: json.articles,
                pages: json.pages,
                page: json.page,
                limit: json.limit,
                count: json.count
            });
            Event.emit('total', that.state.count);
            return json;
        }).catch(err => {
            console.log('请求错误', err);
        });
    }
  
    handleInfiniteOnLoad = () => {
      let data = this.state.articles;
      this.setState({
        loading: true,
      });
      if (data.length > 14) {
        message.warning('Infinite List loaded all');
        this.setState({
          hasMore: false,
          loading: false,
        });
        return;
      }
      this.fetchData((res) => {
        data = data.concat(res.results);
        this.setState({
          data,
          loading: false,
        });
      });
    }
    getDetail(id) {
      this.props.history.push({
        pathname:'/articleDetails',
        articleId: id
      });
    }
    render() {
      return (
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.articles}
              renderItem={item => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.article_title}</a>}
                    description={<p><span>{item.author}</span><span>{item.createTime}</span></p>}
                  />
                  <div>{item.author}</div>
                  <div>
                    <Button type="primary" size='small' onClick={this.getDetail.bind(this,item._id)}>
                      查看详情
                    </Button>
                  </div>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
      );
    }
  }

  export default withRouter(ArticleItem);