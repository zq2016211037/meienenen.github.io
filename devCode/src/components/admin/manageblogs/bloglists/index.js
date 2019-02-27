import React from 'react';
import { Table, Input, Popconfirm } from 'antd';
import axios from 'axios';
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancle') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}

class BlogLists extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '博客标题',
      dataIndex: 'article_title',
      width: '15%',
      editable: true
      // render: (text, record, index) => this.renderColumns(this.state.articles, index, 'article_title', text)
    },{
      title: '博客内容',
      dataIndex: 'article_content',
      width: '25%',
      // editable: true
      render: (text, record, index) => this.renderColumns(this.state.articles, index, 'article_content', text)
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '15%',
      // editable: true
      render: (text, record, index) => this.renderColumns(this.state.articles, index, 'createTime', text)
    }, {
      title: '作者',
      dataIndex: 'author',
      width: '15%',
      // editable:true
      render: (text, record, index) => this.renderColumns(this.state.articles, index, 'author', text),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.articles[index].article_title===undefined?"":this.state.articles[index].article_title;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a onClick={() => this.edit(index)}>Edit</a>
                </span>
            }
          </div>
        );
      },
    }];
    this.state = {
      articles: [],
      defaultCurrent: 1,
      current: '',
      total: 3,
      defaultPageSize: 2,
      updateObj: []
    };
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key]===undefined ? "": data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { articles } = this.state;
    // var item = {};
    articles[index][key].value = value;
    // item[key] = value;
    // this.state.updateObj.push(item);
    this.setState({
      articles , 
    });
    // console.log(this.state.updateObj);
  }
  edit(index) {
    const { articles } = this.state;
    Object.keys(articles[index]).forEach((item) => {
      if (articles[index][item] && typeof articles[index][item].editable !== 'undefined') {
        articles[index][item].editable = true;
      }
    });
    this.setState({ articles });
  }
  editDone(index, type) {
    const { articles } = this.state;
    console.log(articles);
    var updateoper = articles;
    Object.keys(articles[index]).forEach((item) => {
      if (articles[index][item] && typeof articles[index][item].editable !== 'undefined') {
        articles[index][item].editable = false;
        articles[index][item].status = type;
        console.log(articles[index][item]);
      }
    });
    var article_id = articles[index]._id.value;
    var updateStr = {};
    Object.keys(updateoper).forEach(function(i,val,arr){
      var updateval = updateoper[val].value;
      updateStr[val] = updateval;
      console.log(updateStr);
    })
    this.updateData(article_id,updateStr);
    this.setState({ articles }, () => {
      Object.keys(articles[index]).forEach((item) => {
        if (articles[index][item] && typeof articles[index][item].editable !== 'undefined') {
          delete articles[index][item].status;
        }
      });
    });
  }
  onChange = (page) => {
    this.fetchData(page);
  }
  render() {
    const { articles } = this.state;
    console.log(articles);
    const dataSource = articles.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return <Table 
                    bordered 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{  // 分页
                      // simple: true,
                      defaultCurrent: this.state.defaultCurrent,
                      // current: this.state.current,
                      total: this.state.total,
                      defaultPageSize: this.state.defaultPageSize,
                      onChange: this.onChange,
                    }}
          />;
  }
  componentDidMount() {
    this.fetchData();
    this.render();
    // console.log(this.state);
  }
  fetchData = (page) => {
    var reqpage = page || 1;
    console.log(reqpage);
    var that = this;
    var url ="http://localhost:8003/front/getBlogLists?page="+reqpage;
    this.blogsRes = fetch(url,{
        method: 'GET',
        mode: 'cors',
        headers:{
          'Access-Control-Allow-Origin':'*'
        }
    }).then(res => {
        return res.json();
    }).then(json => {
        console.log('获取的结果', json);
        var result = [];
        json.articles.forEach(function(value,index,array){
          var item = value;
          var objall = {};
          objall.key = index;
          // console.log(item);
          Object.keys(item).forEach(function(val,i,arr){
            var obj = {};
              // console.log(val);
              obj.value= item[val];
              obj.editable = false;    
              objall[val] = obj;
          })
          result.push(objall);
        })
        that.setState({
            articles: result,
            // total2: json.pages,
            current: json.page,
            defaultPageSize: json.limit,
            total: json.count
        });
        console.log(this.state.articles);
        return json;
    }).catch(err => {
        console.log('请求错误', err);});
  }
  updateData = (article_id,updateStr) => {
    var url ="http://localhost:8003/admin/blog/saveblog";
    axios({
      url: url,
      method: 'post',
      data: `updateStr=${JSON.stringify(updateStr)}&article_id=${article_id}`
    }).then(function(rs){
      console.log(rs)
    }).then(function(err){
      console.log(err);
    })
  }
  // updateData = (id,updateStr) => {
  //   var url ="http://localhost:8888/admin/blog/saveblog";
  //   // var data = new FormData();
  //   // data.append("_id","5c25d62c90cff6082bb0cdff");
  //   // data.append("article_title","it is a good day");
  //   var params = {
  //     "_id":"5c25d62c90cff6082bb0cdff",
  //     "article_title":"it is a good day"
  //   };
  //   this.updataBlogsRes = fetch(url,{
  //       method: 'POST',
  //       mode: 'cors',
  //       body:`data=${JSON.stringify(params)}`,
  //       // credentials: 'include',
  //   }).then(res => {
  //       return res.json();
  //   }).then(json => {
  //       console.log('获取的结果', json);
  //       // var result = [];
  //       // json.articles.forEach(function(value,index,array){
  //       //   var item = value;
  //       //   var objall = {};
  //       //   objall.key = index;
  //       //   Object.keys(item).forEach(function(val,i,arr){
  //       //     var obj = {};
  //       //       obj.value= item[val];
  //       //       obj.editable = false;    
  //       //       objall[val] = obj;
  //       //   })
  //       //   result.push(objall);
  //       // })
  //       // this.setState({
  //       //     articles: result,
  //       //     // total2: json.pages,
  //       //     current: json.page,
  //       //     defaultPageSize: json.limit,
  //       //     total: json.count
  //       // });
  //       // return json;
  //   }).catch(err => {
  //       console.log('请求错误', err);});
  // }
}

export default BlogLists;