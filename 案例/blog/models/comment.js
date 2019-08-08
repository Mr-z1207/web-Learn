const mongoose = require('mongoose')
const moment = require('moment')

const pagination = require('../util/pagination.js')

const commentSchema = new mongoose.Schema({
	content:{
        type:String,
        required:[true,"评论了内容必须输入"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'article'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

commentSchema.virtual('createdTime').get(function(){
    return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})
commentSchema.statics.getPaginationCommentsData = function(req,query={}) {
    const paginations =  pagination({
        page:req.query.page,
        modules:this,
        sort:{_id:-1},
        query:query,
        populates:[{path: 'user', select: 'username' },{path: 'article', select: 'title'}]
    })

    return paginations
}


const comment = mongoose.model('comment', commentSchema);
module.exports = comment