const express = require('express')
const comment = require('../models/comment.js')

const router = express.Router()

router.use((req,res,next)=>{
    if(req.userInfo._id){
        next()
    }else{
        res.send('<h1>请登录账号</h1>')
    }
})

router.post('/add',(req,res)=>{
	const {content,article} = req.body
	// console.log(article)
	comment.insertMany({
		content:content,
		article:article,
		user:req.userInfo._id
	})
	.then(comments=>{
		comment.getPaginationCommentsData(req,{article:article})
		.then(data=>{
			res.json({
				status:0,
                message:"添加评论成功",
                data:data
			})
		})
		 .catch(err=>{
            res.json({
                status:10,
                message:"添加评论失败"
            })
        })
	})
	.catch(err=>{
        res.json({
            status:10,
            message:"添加评论失败"
        })
    })
})

router.get('/list',(req,res)=>{
	let query = {}
	if (req.query.id) {
		query = {article:req.query.id}
	}
	comment.getPaginationCommentsData(req,query)
	.then(data=>{
		res.json({
			status:0,
            message:"获取文章数据成功",
			data
		})
	})
	.catch(err=>{
        res.json({
            status:10,
            message:"获取文章数据失败"
        })        
    })
})
module.exports = router