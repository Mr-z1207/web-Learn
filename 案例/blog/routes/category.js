const express = require('express')
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

router.get('/',(req, res) => {
	pagination({
		page:req.query.page,
		modules:categorys,
		sort:{order:-1}
	})
	.then(data=>{
		// console.log(data)
		res.render("admin/category_list",{
			userInfo:req.userInfo,
			categorys:data.docs,
			page:data.page,
			list:data.list,
			pageMax:data.pageMax,
			url:"/category"
		})
	})
})

router.get('/add',(req, res) => {
	res.render("admin/category_add_edit",{userInfo:req.userInfo})
})

router.post('/add',(req, res) => {
	// console.log(req.body)
	let { name,order } = req.body
	if (!order) {
		order = 0
	}
	categorys.findOne({name})
	.then(data=>{
		if (data) {
			res.render('admin/err',{
				Msg:'分类名称已存在，请更换',
				userInfo:req.userInfo
			})
		}else{
			categorys.insertMany({name,order})
			.then(data=>{
				res.render('admin/success',{
					Msg:'新增成功！',
					url:'/category',
					userInfo:req.userInfo
				})
			})
			.catch(err=>{
				res.render('admin/err',{
					Msg:err.Msg.toString(),
					userInfo:req.userInfo
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			Msg:'服务器错误，请稍后再试',
			userInfo:req.userInfos
		})
	})
})

router.get('/edit/:id',(req, res) => {
	const {id} = req.params
	categorys.findOne({_id:id})
	.then(data=>{
		res.render("admin/category_add_edit",{userInfo:req.userInfo,data})
	})
})
router.post('/edit',(req, res) => {
	let { name,order,id } = req.body
	if (!order) {
		order = 0
	}
	// console.log(id)
	categorys.findById(id)
	.then(data=>{
		if (name == data.name && order == data.order) {
			res.render('admin/err',{
				Msg:'请更改数据后再提交更新',
				userInfo:req.userInfo
			})
		}else{
			categorys.findOne({name:name,_id:{$ne:id}})
			.then(data=>{
				if (data) {
					res.render('admin/err',{
						Msg:'已有相同分类，请更改',
						userInfo:req.userInfo
					})
				}else{
					categorys.updateOne({_id:id},{name,order})
					.then(data=>{
						res.render("admin/success",{
                            Msg:"更新分类成功",
                            url:'/category',
                            userInfo:req.userInfo
                        })
					})
					.catch(err=>{
                        res.render("admin/err",{
                            Msg:"数据库操作失败",
                            userInfo:req.userInfo
                        })
                    })
				}
			})
			.catch(err=>{
                res.render("admin/err",{
                    Msg:"数据库操作失败",
                    userInfo:req.userInfo
                })
            })  
		}
	})
	.catch(err=>{
        res.render("admin/err",{
            Msg:"数据库操作失败",
            userInfo:req.userInfo
        })
    })  
})


router.get('/del/:id',(req, res) => {
	const {id} = req.params
	categorys.deleteOne({_id:id})
	.then(data=>{
		res.render("admin/success",{
            Msg:"删除分类成功",
            url:'/category',
            userInfo:req.userInfo
        })
	})
	.catch(err=>{
        res.render("admin/err",{
            Msg:"数据库操作失败",
            userInfo:req.userInfo
        })
    }) 
})
module.exports = router