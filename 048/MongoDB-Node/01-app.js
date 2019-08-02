const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = 'it';
client.connect(err => {
	const db = client.db(dbName);
	const collection = db.collection('inserts')


	// db.collection('inserts').insertOne({a:1},(err,r)=>{
	// 	console.log(r)
	// })
	// db.collection('inserts').insertMany([{a:2}, {a:3}],(err,r)=>{
	// 	console.log(r)
	// })
	// client.close();

	 collection.find({}).toArray((err,docs)=>{
	 	let r = docs.map(val=>{
	 		console.log(val.a)
	 	})
	 })
	 client.close();
});