const t1 = setTimeout(()=>{
	console.log('execute t1')
}, 1000);

console.log(t1)
clearTimeout(t1)