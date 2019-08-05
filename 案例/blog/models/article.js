const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title:{
        type:String,
        required:[true,"文章标题必须输入"],
    },
    intro:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'  //关联的模型
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    click:{
        type:Number,
        default:0
    },
    content:{
        type:String
    }

});

const article = mongoose.model('article', articleSchema);
module.exports = article