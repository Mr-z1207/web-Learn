const mongoose = require('mongoose');

const kittySchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,"必须输入姓名"]
	},
	age:Number,
	major:{
		type:String,
		default:'Art',
		enum:["Art","Music"]
	},
	creatAt:{
		type:Date,
		default:Date.now()
	},
	phone:{
		type:String,
		validate:{
            validator:function(v){
                return /1[358]\d{9}/.test(v)
            },
            message:'{VALUE} 不是合法电话号码'
        }
	}
});

const Kitten = mongoose.model('Kitten', kittySchema);


module.exports = Kitten