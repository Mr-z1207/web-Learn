const fs = require('fs')
const util = require('util')
const path = require('path')
const sd = require('silly-datetime')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const dataPath = path.normalize(__dirname + '/../data/item.json')


getData=async()=>{
	const data = await readFile(dataPath)
	const arr = JSON.parse(data)
	return arr
}


writeData=async(task)=>{
	const data = await readFile(dataPath)
	const arr = JSON.parse(data)
	const obj = {
		id:sd.format(new Date(), 'MM/DD HH:mm:ss'),
		task:task
	}
	arr.push(obj)
	await writeFile(dataPath,JSON.stringify(arr),{flag:'w'})
	return obj
}

remData=async(id)=>{
	const data = await readFile(dataPath)
	const arr = JSON.parse(data)
	
	const newArr = arr.filter((item)=>{
		return item.id != id
	})

	await writeFile(dataPath,JSON.stringify(newArr),{flag:'w'})
	return
}

module.exports = {
	getData,writeData,remData
}