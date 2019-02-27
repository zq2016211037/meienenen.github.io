#myblog


## 2018/12/8 之前  创建项目结构

使用create-react-app初始化项目结构、整理项目结构，新建server文件夹用于管理后台服务、创建接口、数据管理等，在已存在的src文件中进行前端页面、逻辑处理

## 2018/12/8 使用git创建分支  开始项目开发  后台逻辑处理

处理后台业务逻辑 创建数据表、schema、配置（使用express创建服务器、使用static进行静态文件托管，指定路由清单）

1. npm init 初始化server项目

2. 安装相关依赖包
	express：
    mongoose：数据库操作
    bodyParse: 借新用户post请求
    cookies： 读写cookie，存取用户登录信息
    ...后期补充
    
3. 连接数据库

## 2018/12/12 连接数据库成功，准备写后台接口了

1. 在mongodb的安装目录下面，使用命令行 mongod可以启动服务 mongod --dbpath = 数据存放路径

2. 接口地址： 

	前台展示
	
    用户信息获取：http://localhost:8888/front/getUserInfo
    
    博客列表获取： http://localhost:8888/front/getBlogLists
    
    后台管理

	管理员登录注册：

            http://localhost:8888/Admin/register
    
    			  http://localhost:8888/Admin/sign_in
                  
    			  http://localhost:8888/Admin/sign_out
    
## 2018/12/26 eslint的使用配置

 react报错：No ESLint configuration found.

安装配置文件

 npm install eslint --save-dev

./node_modules/.bin/eslint --init 初始化配置文件

eslint react xxx is assigned a value but never used 

https://www.jianshu.com/p/2cda93d4d79b

## 2018/12/27 重新整理一下

解决node跨域问题

在node.js中使用插件

```
var cors = require('cors');

app.use(cors());
```
## 2018/12/31

后台中引入body-parser插件解决请求参数的处理

引入body-parser之后参数传递还是失败：

```
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
```

## 2018/1/19

1. 接口添加

2. 接口地址： 

	前台展示
	
    用户信息获取：http://localhost:8888/front/getUserInfo
    
    博客列表获取： http://localhost:8888/front/getBlogLists

    +保存新编辑文章： http://localhost:8888/front/saveArticle (对游客隐藏)

    +获取文章详情：http://localhost:8888/front/detailArticle

    +私信作者： http://localhost:8888/front/sendMsg

    +获取私信列表： http://localhost:8888/front/getMsg(对游客隐藏)


    
    后台管理

	管理员登录注册：
  
            http://localhost:8888/Admin/register
    
    			  http://localhost:8888/Admin/sign_in
                  
    			  http://localhost:8888/Admin/sign_out



## 总结

1. setState之后立即访问state,往往是不能得到更新之后的state值的.

