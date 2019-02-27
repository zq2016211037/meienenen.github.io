//游客视图
var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Article = require("../models/Article");
// +保存新编辑文章： http://localhost:8888/front/saveArticle (对游客隐藏)

// +获取文章详情：http://localhost:8888/front/detailArticle

// +私信作者： http://localhost:8888/front/sendMsg

// +获取私信列表： http://localhost:8888/front/getMsg(对游客隐藏)

// router.get("/getUserInfo", function (req, res, next){

//     //limit:限制查询数据条数
//     //skip:忽略数据条数
//     //page 1 :skip 0
//     //page 2:skip 
//     var page = Number(req.query.page || 1);
//     var limit = 2;
//     var skip = 0;
//     User.count().then(function (count) {
//         var pages = 0;
//         // var count = count;
//         pages = Math.ceil(count/limit);
//         page = Math.min(page, pages);
//         page = Math.max(page, 1);
//         skip = (page - 1) * limit;
//         console.log('page' + page + 'pages' + pages);
//         User.find().limit(limit).skip(skip).then(function (users) {
//             // console.log(users);
//             res.send({
//                 users: users,
//                 page: page,
//                 pages: pages,
//                 limit: limit,
//                 count: count,
//             })
//         })
//     })
// })
router.get("/getBlogLists", function (req, res, next){

    //limit:限制查询数据条数
    //skip:忽略数据条数
    //page 1 :skip 0
    //page 2:skip 
    var page = Number(req.query.page || 1);
    var limit = 2;
    var skip = 0;
    Article.count().then(function (count) {
        console.log(count);
        var pages = 0;
        // var count = count;
        pages = Math.ceil(count/limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        skip = (page - 1) * limit;
        console.log('page' + page + 'pages' + pages);
        Article.find().limit(limit).skip(skip).then(function (articles) {
            // console.log(users);
            res.send({
                articles: articles,
                page: page,
                pages: pages,
                limit: limit,
                count: count
            });
        })
    })
})
router.post("/detailArticle",function(req,res,next){
    var id = req.body.id;
    Article.find({_id: id}).then(function(rs){
        res.send({
            articlesDetail: rs
        })
    })
})
router.post('/saveArticle',function(req,res,next){
    console.log(req.body);
    Article.create({
        "article_title": req.body.article_title,
        "article_content": req.body.article_content,
        "author": req.body.author,
        "createTime": req.body.createTime,
        "contentall":req.body.contentall
    },function(err){
        if(!err){
            console.log('charuchenggong');
            res.send('保存成功');
        }else{
            res.send('保存失败');
        }
    })
})
router.get('/sendMsg',function(req,res,next){

})
router.get('/getMsg',function(req,res,next){

})

//定义public路径
var pub = __dirname + '/public';
router.use(express.static(pub));//设置静态目录为pubic
var multer  = require('multer');
var storage = multer.diskStorage({
  //设置上传后文件路径，"d:/myapp/public/uploads文件夹"会自动创建。
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  }, 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({ storage: storage })  
 
//单文件上传获取信息
router.post('/uploadfile',upload.array('files'),function(req,res,next){
  var file=req.file;
  console.log(req);
  console.log("original file name is "+file.originalname);//original file name is 20170615_211619.jpg
  console.log("file name is " + file.filename);//file name is myfile-1511013577361.jpg
  res.send({ret_code: '0'});//这行代码必须要有，否则Browser会处于wait状态。
})


module.exports = router;