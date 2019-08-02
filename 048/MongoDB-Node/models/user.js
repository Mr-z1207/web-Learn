const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		default:"张三",
		required:[true,"必须输入姓名"]
	}
});

userSchema.methods.findBlog = function(cb) {
	console.log(this._id)
	this.model('blog').find({author_id:this._id},cb)  //用this

	// this是  Model  的一个实例
}

const user = mongoose.model('user', userSchema);

module.exports = user