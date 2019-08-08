const express = require('express')
const categorys = require('../models/category.js')
const article = require('../models/article.js')
const comment = require('../models/comment.js')

const router = express.Router()

async function getCommonData() {
	const categoryPromise = categorys.find({},"name").sort({order:-1})
	const articlesPromise = article.find({},"click title").sort({click:-1}).limit(10)
	const category = await categoryPromise
	const topArticles = await articlesPromise

	return {
		category,
		topArticles
	}
}
//显示首页
router.get("/",(req,res)=>{
	getCommonData().then(data=>{
		const { category,topArticles } = data
		article.getPagination(req)
		.then(data=>{
			// console.log(category)
			// console.log(data.docs)
			res.render("main/index",{
				userInfo:req.userInfo,
				category,
				topArticles,
				/////////////////
				articles:data.docs,
				page:data.page,
				list:data.list,
				pageMax:data.pageMax
			})
		})
	})
})
router.get('/articles', (req, res) => {
	// console.log(req.query.id)
	let query = {}
	if (req.query.id) {
		query = {category:req.query.id}
	}
	article.getPagination(req,query)
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




// router.get("/index.html",(req,res)=>{res.render("main/index")})

router.get('/list/:id',(req, res) => {
	const {id} = req.params
	// console.log(id)
	getCommonData().then(data=>{
		const { category,topArticles } = data
		article.getPagination(req,{category:id})
		.then(data=>{
			// console.log(data)
			res.render("main/list",{
				userInfo:req.userInfo,
				category,topArticles,
				articles:data.docs,
				page:data.page,
				list:data.list,
				pageMax:data.pageMax,
				categoryid:id
			})
		})

	})
})
///////////////////////////////////////////
async function getDetail(req) {
	const id = req.params.id
	const commonDataPromise = getCommonData()
	const articleDataPromise = article.findOneAndUpdate({_id:id},{$inc:{click:1}},{nwe:true})
								.populate({path: 'user', select: 'username' })
								.populate({path: 'category', select: 'name'})
	const commentPromise = comment.getPaginationCommentsData(req,{article:id})

	const commonData = await commonDataPromise
	const articleData = await articleDataPromise
	const commentData = await commentPromise


	const { category,topArticles } = commonData
	return {
		category,
		topArticles,
		articleData,
		commentData
	}
}
router.get('/detail/:id',(req, res) => {
	getDetail(req)
	.then(data=>{
		const {category,topArticles,articleData,commentData} = data
		// console.log(commentData)
		res.render("main/detail",{
			userInfo:req.userInfo,
			category,
			topArticles,
			articleData,
			categoryid:articleData.category._id,
			comments:commentData.docs,
			page:commentData.page,
			list:commentData.list,
			pageMax:commentData.pageMax
		})
	})
})

module.exports = router