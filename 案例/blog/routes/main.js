const express = require('express')

const router = express.Router()

router.get("/",(req,res)=>{
	res.render("main/index",{userInfo:req.userInfo})
})
// router.get("/index.html",(req,res)=>{res.render("main/index")})

router.get('/list.html',(req, res) => {res.render("main/list")})

router.get('/detail.html',(req, res) => {res.render("main/detail")})

module.exports = router