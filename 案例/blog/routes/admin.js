const express = require('express')

const router = express.Router()

router.get("/",(req,res)=>{
	res.render("admin/index",{userInfo:req.userInfo})
})
module.exports = router