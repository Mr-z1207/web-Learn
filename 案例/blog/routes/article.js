const express = require('express')

// const multer  = require('multer')
// const upload = multer({ dest: 'public/uploads/' })

const article = require('../models/article.js')
const categorys = require('../models/category.js')
const pagination = require('../util/pagination.js')

const router = express.Router()

router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>')
    }
})

router.get("/",(req,res)=>{
	pagination({
		page:req.query.page,
		modules:article,
		sort:{category:-1}
	})
	.then(data=>{
		// console.log(data)
		res.render("admin/article_list",{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pageMax:data.pageMax,
			url:"/article"
		})
	})
})

router.get("/add",(req,res)=>{
	categorys.find({})
	.then(data=>{
		res.render("admin/article_add",{categories:data,userInfo:req.userInfo})
	})
})
router.post("/add",(req,res)=>{
	// console.log(req.body)
	// const {category,title,intro,content} = req.body

	// article.findOne({title:title})
	// .then()
})

module.exports = router