async function pagination(option) {
	let {page,modules,query={},sort={_id:-1},projection="-__v"} = option
	
	page = parseInt(page)
	const limit = 2
	if (isNaN(page)) {
		page = 1
	}

	const count = await modules.countDocuments()


	const pageMax = Math.ceil(count / limit)
	if(page > pageMax){
		page = pageMax
	}
	if (page < 1) {
		page = 1
	}
	let list = []
	for(let i = 0;i < pageMax;i++){
		list.push(i+1)
	}
	const skip = (page-1)*limit

	const docs = await modules.find(query,projection).sort(sort).skip(skip).limit(limit)
	
	return {
        docs:docs,
        page:page,
        list:list,
        pageMax:pageMax        
    }
}

module.exports = pagination