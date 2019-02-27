var mongoose = require('mongoose');
var articlesSchema = require('../schema/articles');

module.exports = mongoose.model('Article', articlesSchema);