const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect('mongodb://localhost/it', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	const blog = require("./models/blogs.js")
	const users = require("./models/user.js")

	// blog.insertMany([{blog:"b1"},{blog:"b2"},{blog:"b3"}])

	users.findOne({name:"张三"},(err,doc)=>{
		console.log(doc._id)
		doc.findBlog((err,blog)=>{//用某个确定的文档调用【userSchema.methods.findBlog】
			console.log(blog)
		}) 
	})
});