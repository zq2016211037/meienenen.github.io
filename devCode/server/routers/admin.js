//后台管理视图
var express = require("express");
var router = express.Router();
var User = require("../models/User");
var Article = require('../models/Article');
//用户登录注册

router.get('/',function(req,res,next){
   
})
//注册
router.get("/register",function(req,res,next){
    //保存前段传回的数据
    var responseData;
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    console.log(req.body);
    if (username === '') {
        responseData.code = 1;
        responseData.messege = '用户名不能为空';
        //将数据转为json格式并传给前段
        res.json(responseData);
        return;
    }
    if (password === '') {
        responseData.code = 2;
        responseData.messege = '密码不能为空';
        res.json(responseData);
        return;
    }
    if (password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次密码输入不一致';
        res.json(responseData);
        return;
    }
    //用户名是否已经注册
    User.findOne({
        username: username
    }).then(function (userInfo) {

        if (userInfo) {
            responseData.code = 4;
            responseData.massage = '该用户已经注册';
            res.json(responseData);
            return;
        }
        //保存用户注册信息
        var user = new User({
            username: username,
            password: password
        });
        return user.save();
    }).then(function (newUserInfo) {
        console.log(newUserInfo);
        res.json(responseData);
        responseData.message = '输入成功';
    })
})
//登录
router.post("/sign_in",function(req,res,next){
    var username = req.body.username;
	var password = req.body.password;
    var responseData;
	//用户名与密码不能为空
	if(username === '' || password === ''){
		responseData.code = 1;
		responseData.message = '用户名或密码不能为空';
		res.json(responseData);
		return;
	}

	//用户名是否存在
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		//用户名或者密码不存在
		if(!userInfo){
			responseData.code = 2;
			responseData.message = '用户名或密码错误';
			res.json(responseData);
			return;
		}

		//用户名密码正确
		responseData.message = '登录成功';
		responseData.userInfo = {
			_id:userInfo._id,
			username:userInfo.username
		};
		//发送cookie
		// req.cookies.set('userInfo',JSON.stringify({
		// 	_id:userInfo._id,
		// 	username:userInfo.username
		// }));

		res.json(responseData);

		return;
	})
})
//退出
router.get('/user/loginOut', function (req, res, next) {
    var responseData;
    req.cookies.set('userInfo', null);
    responseData.message = '退出';
    res.json(responseData);
})
router.post('/blog/saveblog',function(req,res,next){
    var updateStr = JSON.parse(req.body.updateStr);
    console.log(req.body);
    // console.log(updateStr);
    var whereStr = {"_id":req.body.article_id}
    Article.findOneAndReplace(whereStr, updateStr, function(err, result){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + result);
            res.send('hh');
            return;
        }
    })
})
module.exports = router;