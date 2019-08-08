const express = require('express')
const users = require('../models/user.js')
const pagination = require('../util/pagination.js')
const comment = require('../models/comment.js')
const HMAC = require('../util/HMAC.js')

const router = express.Router()

//权限验证
router.use((req,res,next)=>{
    if(req.userInfo._id){
        next()
    }else{
        res.send('<h1>请先登录</h1>')
    }
})


router.get("/",(req,res)=>{
	res.render("home/index",{userInfo:req.userInfo})
})
router.get("/comment",(req,res)=>{
	comment.getPaginationCommentsData(req,{user:req.userInfo._id})
	.then(data=>{
		// console.log(data)
		res.render("home/comment_list",{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page,
			list:data.list,
			pageMax:data.pageMax,
			url:"/home/comment",
		})
	})
})
router.get('/comment/delete/:id', (req, res) => {
    const { id } = req.params
    comment.deleteOne({_id:id})
    .then(result=>{
        res.render("home/success",{
            Msg:"删除评论成功",
            url:'/home/comment'
        })
    })
    .catch(err=>{
        res.render("home/err",{
            Msg:"数据库操作失败",
            url:'/home/comment'
        })
    })    
})

router.get('/password',(req,res)=>{
    res.render("home/password",{
        userInfo:req.userInfo
    })
})
router.post('/password',(req,res)=>{
    const { password } = req.body
    users.updateOne({_id:req.userInfo._id},{password:HMAC(password)})
    .then(result=>{
        req.session.destroy()
        res.render("home/success",{
            userInfo:req.userInfo,
            Msg:"修改密码成功,请重新登录",
            url:'/'
        })
    })
    .catch(err=>{
        res.render("home/err",{
            userInfo:req.userInfo,
            Msg:"修改密码失败",
            url:'/home/password'
        })
    })
})
module.exports = router