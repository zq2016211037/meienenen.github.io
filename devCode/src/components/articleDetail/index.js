import React, { Component } from 'react';
import {Layout} from 'antd';
import axios from 'axios';

class ArticleDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleId:''
        }
    }
    componentDidMount(){
        console.log(this.props.location.articleId);
        this.getDetail();
    }
    getDetail(){
      axios.post('http://localhost:8003/front/detailArticle', {
        id: this.props.location.articleId
      })
      .then(function (response) {
        console.log(response);
        document.querySelector('#contentDom').innerHTML = response.data.articlesDetail[0].contentall;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
        return (
            <Layout>
                <div id='contentDom'></div>
            </Layout>
        )
    }
}
export default ArticleDetail;

