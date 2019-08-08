const express = require('express')

const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

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
	// pagination({
	// 	page:req.query.page,
	// 	modules:article,
	// 	sort:{category:-1},
	// 	populates:[{path: 'user', select: 'username' },{path: 'category', select: 'name'}]
	// })
	article.getPagination(req)
	.then(data=>{
		// console.log(data.docs)
		res.render("admin/article_list",{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pageMax:data.pageMax,
			url:"/article",
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
	const {category,title,intro,content} = req.body
	article.insertMany({
		category,title,intro,content,user:req.userInfo._id
	}).then(data=>{
		res.render('admin/success',{
			Msg:'新增成功！',
			url:'/article',
			userInfo:req.userInfo
		})
	}).catch(err=>{
		res.render('admin/err',{
			Msg:'数据库操作失败',
			userInfo:req.userInfo
		})
	})
})

//上传图片
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadedFilePath = '/uploads/'+req.file.filename;
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})




router.get('/edit/:id',(req, res) => {
	const {id} = req.params
	categorys.find({})
	.then(category=>{
		article.findById(id)
		.then(data=>{
			// console.log(data)
			res.render("admin/article_edit",{
				userInfo:req.userInfo,
				article:data,
				categories:category
			})
		})
	})
})

router.post("/edit",(req,res)=>{
    let { title,category,intro,content,id } = req.body
    article.updateOne({_id:id},{title,category,intro,content})
    .then(result=>{
        res.render("admin/success",{
            Msg:"编辑文章成功",
            url:'/article'
        })                        
    })
    .catch(err=>{
        res.render("admin/err",{
            Msg:"数据库操作失败",
        })
    })        
})


router.get('/delete/:id', (req, res) => {
    const { id } = req.params
    article.deleteOne({_id:id})
    .then(result=>{
        res.render("admin/success",{
            Msg:"删除文章成功",
            url:'/article'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            Msg:"数据库操作失败",
            url:'/article'
        })
    })    
})

module.exports = router