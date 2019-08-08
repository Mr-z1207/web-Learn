const mongoose = require('mongoose');
const moment = require('moment')
const pagination = require('../util/pagination.js')

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

articleSchema.virtual('createdTime').get(function(){
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})

articleSchema.statics.getPagination = function(req,query={}) {
    const paginations =  pagination({
        page:req.query.page,
        modules:this,
        sort:{_id:-1},
        query:query,
        populates:[{path: 'user', select: 'username' },{path: 'category', select: 'name'}]
    })

    return paginations
}

const article = mongoose.model('article', articleSchema);
module.exports = article