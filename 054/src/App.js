import React,{ Component } from 'react'
import { Input,Button,List, Typography,Row,Col } from 'antd';
import store from './store'
import AppUI from './AppUI.js'
import {ChangeAction,ClickAction,DelAction,LoadData} from './store/actionTable.js'
import axios from'axios';

class App extends Component{
	constructor(props){
		// console.log(store)
		super(props);
		// this.state = {
		 //    	list:[],
		 //    	task:''
		 //    };
	    this.state = store.getState()

	    this.handleChange = this.handleChange.bind(this)
	    this.handleClick = this.handleClick.bind(this)
	    this.handleDel = this.handleDel.bind(this)

	    store.subscribe(()=>{
	    	this.setState(store.getState())
	    })
	}
	componentDidMount(){
		// axios.get('http://127.0.0.1:3000')
		// .then(data=>{
		// 	store.dispatch(GetData(data.data))
		// })
		// .catch(err=>{
		// 	console.log(err)
		// })
		store.dispatch(LoadData())
	}
	handleClick(){
		// this.setState((preState)=>({
		// 	list:[...preState.list,preState.task],
		// 	task:''
		// }))
		// const actions = {
		// 	type:"Click_Btn",
		// }
		store.dispatch(ClickAction())
	}
	handleChange(ev){
		const task = ev.target.value
		// this.setState(()=>({
		// 	task:task
		// }))
		// const actions = {
		// 	type:"Change_Item",
		// 	payLoad:task
		// }
		store.dispatch(ChangeAction(task))
	}
	handleDel(index){
		// let list = [...this.state.list]
		// list.splice(index,1)
		// this.setState(()=>({
		// 	list:list
		// }))
		// const actions = {
		// 	type:"Click_Item",
		// 	payLoad:index
		// }
		store.dispatch(DelAction(index))
	}
	render(){
		return <AppUI 
		task = {this.state.task}
		list = {this.state.list}
		handleChange = {this.handleChange}
		handleClick = {this.handleClick}
		handleDel = {this.handleDel}
		/>
	}
}

export default App