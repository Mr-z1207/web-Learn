import React,{ Component } from 'react'
import Item from './Item.js'
import './App.css'

class App extends Component{
	constructor(props){
		super(props);
	    this.state = {
	    	list:[],
	    	task:''
	    }
	    this.handleChange = this.handleChange.bind(this)
	    this.handleClick = this.handleClick.bind(this)
	}
	// static getDerivedStateFromProps(nextProps, prevState){
	// 	console.log(nextProps, prevState)
	// 	return null 
	// }
	// getSnapshotBeforeUpdate(prevProps, prevState){
	// 	console.log(prevProps, prevState)
	// 	return prevState.task
	// }
	// componentDidUpdate(prevProps, prevState,snapshot){
	// 	console.log(prevProps, prevState,snapshot)
	// }
	handleClick(){
		// console.log(this)
		this.setState((preState)=>({
			list:[...preState.list,preState.task],
			task:''
		}))
	}
	handleChange(ev){
		// console.log(ev.target.value)
		const task = ev.target.value
		this.setState(()=>({
			task:task
		}))
	}
	handleDel(index){
		let list = [...this.state.list]
		list.splice(index,1)
		this.setState(()=>({
			list:list
		}))
	}
	getItem(){
		return this.state.list.map((item,index)=>{
			// console.log(item)
			// return <li key={index} onClick={this.handleDel.bind(this,index)}>{item}</li>
			return <Item key={index} task={item} handleDel={this.handleDel.bind(this,index)}/>
			// return <Item key={index} task={item} handleDel={true}/>
		})
	}
	render(){
		console.log('App render...')
		return (///在返回组件内容时,如果不想有多余的标签,可以使用React.Fragment来代替html标签
		<React.Fragment>
			<h1>我是H1</h1>
			<p>return 只能返回一个标签</p>
			<p>想返回多个标签，可以嵌套在一个div中</p>
			<p>当成一个HTML代码返回</p>
			<p style={ {color:"red",fontSize: 20+'px'} }>行间样式的写法，style后面跟一个对象</p>
			{/* js代码，例如：对象，要写在{花括号}里面 */}
			<p className='p-style'>外部样式的写法，类名用className</p>
			{/* import './App.css'   引入CSS文件 */}



			<input type="text" onChange={this.handleChange} value={this.state.task}/>
			<button onClick={this.handleClick}>提交</button>
			<ul>
				{
					this.getItem()
				}
			</ul>
		</React.Fragment>
		)
	}
}

export default App