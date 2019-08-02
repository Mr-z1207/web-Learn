const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	name:{
		type:String,
		default:"张三",
		required:[true,"必须输入姓名"]
	},
	blog:{
		type:String,
	},
	author_id:{
		type:mongoose.Schema.Types.ObjectId,
		default:"5d40f18a8fb2291d008362b6"
	}
});


const blog = mongoose.model('blog', blogSchema);

module.exports = blog