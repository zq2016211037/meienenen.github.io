import React, { Component } from 'react';
import Editor from 'for-editor';
import LeftBar from '../common/protal/leftbar/index'
import { Layout,Button,Modal,Input} from 'antd';
import "../../style/front/common.css";
import axios from 'axios';
class WriteArticle extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      visible: false,
      title:'',
      content:'',
      author: ''
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.saveArticle();
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentDidMount(){
      setInterval(()=>{
      //  this.savemdTohtml();
      },1000);
  }
  handleChange(value) {
    this.setState({
      value
    })
  }
  saveArticle(){
    var mdtohtml = document.querySelector('.for-preview');
    var contentall = mdtohtml.innerHTML;
    var time = new Date();
    console.log(contentall);
    axios.post('http://localhost:8003/front/saveArticle', {
      article_title: this.state.title,
      article_content: this.state.content,
      author: this.state.author,
      createTime: time,
      contentall: contentall
    })
    .then(function (response) {
      console.log(response);
      alert('保存成功');
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { value} = this.state;
    const onChange = (e) => {
      console.log(e.target.value);
      console.log(e.target.name);
      var key = e.target.name;
      switch(key){
        case 'title':
          this.setState({
            title: e.target.value
          });
          break;
        case 'content': 
          this.setState({
            content: e.target.value
          });
          break;
        case 'author':
          this.setState({
            author: e.target.value
          });
        default:
            break;
      }
      console.log(this.state);
    };
    return (
      <Layout>
        <LeftBar></LeftBar>
        <Layout>
          <Editor value={value} onChange={this.handleChange.bind(this)} />   
          <Button type="primary" onClick={this.showModal}>
            保存文章
          </Button>
          <Modal
            title="保存为"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input placeholder="title" onChange={onChange} name='title' value={this.state.title}/>
            <Input placeholder="内容简介50字以内" onChange={onChange} name='content' value={this.state.content}/>
            <Input placeholder="author" onChange={onChange} name='author' value={this.state.author}/>
          </Modal>
        </Layout>  
      </Layout>
    )
  }
}

export default WriteArticle;



