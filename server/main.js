var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require('cors');
//body-parser  将post提交请求数据保存在body中
var bodyParser = require('body-parser');
//跨域
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//静态文件托管
app.use("./public",express.static("public"));

//模块划分
app.use("/admin",require("./routers/admin"));
app.use("/front",require("./routers/front"));

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        app.listen(8003);
        console.log('listen 8003');
    }
});