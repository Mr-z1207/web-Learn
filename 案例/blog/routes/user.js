const express = require('express')
const users = require('../models/user.js')
const HMAC = require('../util/HMAC.js')
// const Cookies = require('cookies')

const router = express.Router()
//注册
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
			users.insertMany({username:username,password:HMAC(password)})
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
//登录
router.post('/login',(req, res) => {
	const {username,password} = req.body //在app.js引用
	// console.log(username,password)
	//同名认证
	users.findOne({username:username,password:HMAC(password)},"-password -__v")
	.then(data=>{
		if (data) {
			// console.log(data)
			// req.cookies.set('userInfo',JSON.stringify(data))
			req.session.userInfo = data
			res.send({
				code:1,
				Msg:"登录成功",
				data:data
			})
		}else{
			res.send({
				code:0,
				Msg:"用户名或密码错误"
			})
		}
	})
	.catch(err=>{
		console.log(err)
		res.send({
			code:10,
			Msg:"服务器端错误,请稍后再试"
		})
	})
})
//退出
router.get('/logout',(req, res)=>{
	req.session.destroy()
	res.json({
		code:1,
		Msg:"退出成功"
	})
})

module.exports = router