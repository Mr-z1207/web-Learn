const express = require('express')
const users = require('../models/user.js')

const router = express.Router()

router.post('/register',(req, res) => {
	const {username,password} = req.body //在app.js引用
	// console.log(username,password)
	//同名认证
	users.findOne({username:username})
	.then(data=>{
		if(data){  //如果没有找到，返回的data是null
			res.send({
				code:0,
				Msg:"该用户名太受欢迎了，请更换一个吧!"
			})
		}else{
			users.insertMany({username:username,password:password})
			.then(data=>{
				res.send({
					code:1,
					Msg:"注册成功!!!",
					data:data[0]
				})
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{
		res.send({
			code:10,
			Msg:"服务器端错误,请稍后再试"
		})
	})
})

module.exports = router