var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    age: String,
    comments: String,
    fans: String,
    shorts: String,
    github: String,
    qq: String,
    tel: String
})