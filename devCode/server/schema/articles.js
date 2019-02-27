var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    article_id: String,
    article_title: String,
    createTime: String,
    article_content: String,
    author: String,
    contentall: String
})