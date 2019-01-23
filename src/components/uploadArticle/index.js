
  import React,{Component} from 'react';
import { Upload, Icon, Modal, Layout, Button } from 'antd';
import LeftBar from '../common/protal/leftbar/index'
import axios from 'axios';
class UploadArticle extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: '-1',
      originalname: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  uploadFile = ()=>{
    alert('shangchuan');
    console.log(this.state);
    var file = { 
    fieldname: 'file',
    originalname: '附件：“三夜两节”期间学生去向统计表.xls',
    encoding: '7bit',
    mimetype: 'application/octet-stream',
    filename: 'avatar-1548245708773.xls',
    size: 18432 };
    axios.post('http://localhost:8003/front/uploadfile',{
      // 'file': that.state.fileList[0]
      'file': file
    }).then(function(success){
      console.log(success);
    }).then(function(err){
      console.log(err);
    })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Layout>
        <LeftBar></LeftBar>
        <Layout>
            <div className="clearfix">
            <Upload
              // action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          <Button type='primary' onClick={this.uploadFile}>上传博客文件</Button>
        </Layout>
      </Layout>
    );
  }
}
export default UploadArticle;