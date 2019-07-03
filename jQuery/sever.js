var http = require('http');
var fs = require('fs')
var url = require('url')

var server = http.createServer(function(req,res) {
	
	if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}


	if (req.method == 'POST') {
		var body = "";
		req.on('data',function(chunk) {
			body += chunk
		})
		req.on('end',function() {
			res.end(body)
		})
	} else if (req.method == 'GET') {
		if (req.url.search(/\?/) == -1) {
			var filePath  = "./" + req.url;
			fs.readFile(filePath,function(err,data){
				if(err){
					res.statusCode = 404;
					res.end("not found!!!");
				}else{
					res.end(data);
				}
			})
		}else{
			var tmp = url.parse(req.url,true).query
			// console.log(tmp)
			var objToJSON = JSON.stringify(tmp)
			res.end(objToJSON)
		}



	} else {
		res.end('ok')
	}
});

server.listen(3001, '127.0.0.1', function() {
  console.log("server is running at http://127.0.0.1:3001");
});