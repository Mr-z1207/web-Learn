const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:[true,"姓名必须输入"],
        minlength:[3,"用户名最小长度为3个字符"],
        maxlength:[10,"用户名最大长度为10个字符"]
	},
	password:{
		type:String,
		required:[true,"密码必须输入"]
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
});

const users = mongoose.model('user', userSchema);
module.exports = users