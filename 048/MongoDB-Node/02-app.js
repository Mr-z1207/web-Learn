const mongoose = require('mongoose');
const moment = require('moment');


getR=(min,max)=>Math.round(min+(max-min)*Math.random())
const names = ["Amy","Leo","Andy","Jack","Tom","Lucy","Ashlee","Edmun","Rick","Peter"]
const majors = ["Art","Music","Sport","Computer","English"]





mongoose.connect('mongodb://localhost/it', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	// const kittySchema = new mongoose.Schema({
	// 	name: String,
	// 	age:Number,
	// 	major:String,
	// });

	// const Kitten = mongoose.model('Kitten', kittySchema);
	//model第一个参数指定集合名称，第二个参数指定Schema
	const kitten = require("./models/kitten.js")


	// var silence = new kitten({name: 'Tomm',age:18});
	// // console.log(silence);

	// silence.save(function (err, silence) {
	// 	if (err) return console.error(err);
	// 	console.log(silence)
	// });

	// kitten.find({name:"Tomm"},(err,doc)=>{
	// 	doc.map((val)=>{
	// 		console.log(val.name)
	// 	})
	// })
	//*******************************************************
	// let arr = []
	// for(let i = 0;i<100;i++){
	// 	arr.push({
	// 		name:names[getR(0,names.length-1)],
	// 		age:getR(10,120),
	// 		major:majors[getR(0,majors.length-1)]
	// 	})
	// }
	// console.log(arr)
	// kitten.insertMany(arr,(err,docs)=>{
	// 	if (err) {
	// 		console.log(err)
	// 	}else{
	// 		console.log(docs)
	// 	}
	// })
	//*******************************************************
	// kitten.find({},(err,data)=>{
	// 	console.log(data.length)
	// })
	//*******************************************************
	// kitten.deleteMany({age:{$gt:0}},(err,data)=>{
	// 	if(err){
	// 		console.log(err)
	// 	}else{
	// 		console.log(data)
	// 	}
	// })
	//*******************************************************
	kitten.insertMany({phone:"11111111111"},(err,docs)=>{
		if (err) {
			console.log(11)
			console.log(err.message)
		}else{
			console.log(22)
			console.log(docs)
			// const dade = moment(kitten.creatAt).format('YYYY-MM-DD HH:mm:ss dddd')
			// console.log(dade)
		}
	})
});