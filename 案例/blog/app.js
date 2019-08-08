const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Cookies = require('cookies')
const session = require('express-session')
const MongoStore = require("connect-mongo")(session)
//*************************************************************************
const app = express()
const port = 3000
//*************************************************************************
//1.连接数据库
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

//获取db对象
const db = mongoose.connection

//连接数据库失败
db.on('error', (err) => {
	console.log('connection db error:',err)
	throw err
})
//连接数据库
db.once('open', () => {
	console.log('connection db success')
})




//*************************************************************************
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//*************************************************************************
//开发阶段设置不走缓存
swig.setDefaults({
  // cache: 'memory'
  cache:false
})
//配置应用模板
//第一个参数是模板名称,同时也是模板文件的扩展名
//第二个参数是解析模板的方法
app.engine('html', swig.renderFile)

//配置模板的存放目录
//第一参数必须是views
//第二个参数是模板存放的目录
app.set('views', './views')

//注册模板引擎
//第一个参数必须是view engine
//第二个参数是模板名称,也就是app.engine的第一个参数
app.set('view engine', 'html')


//*************************************************************************
//设置Cookies保存用户信息
// app.use((req,res,next)=>{
// 	req.cookies = new Cookies(req,res);
// 	let userInfo = {}
//	if(req.cookies.get('userInfo')){
//		userInfo = JSON.parse(req.cookies.get('userInfo'))
//     } 
//     req.userInfo = userInfo
    
//     next()
// })

// 添加session中间件
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })   
}))

//*************************************************************************
app.use((req,res,next)=>{  
    req.userInfo = req.session.userInfo || {}
    next()
})
//*************************************************************************

app.use("/",require("./routes/main.js"))
app.use("/user",require("./routes/user.js"))
app.use("/admin",require("./routes/admin.js"))
app.use("/home",require("./routes/home.js"))
app.use("/category",require("./routes/category.js"))
app.use("/article",require("./routes/article.js"))
app.use("/comment",require("./routes/comment.js"))

app.listen(port, () => console.log(`app listening on port ${port}!`))