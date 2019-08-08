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










router.get("/",(req,res)=>{
	comment.getPaginationCommentsData(req)
	.then(data=>{
		// console.log(data)
		res.render("admin/comment_list",{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page,
			list:data.list,
			pageMax:data.pageMax,
			url:"/comment",
		})
	})
})
router.get('/delete/:id', (req, res) => {
    const { id } = req.params
    comment.deleteOne({_id:id})
    .then(result=>{
        res.render("admin/success",{
            Msg:"删除评论成功",
            url:'/comment'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            Msg:"数据库操作失败",
            url:'/comment'
        })
    })    
})
module.exports = router