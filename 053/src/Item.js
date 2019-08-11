import React,{ Component } from 'react'
import PropTypes from 'prop-types';


//<li key={index} onClick={this.handleDel.bind(this,index)}>{item}</li>
class Item extends Component{
	constructor(props){
		super(props);
	}
	render(){
		console.log('Item render...')
		return <li onClick={this.props.handleDel}>{this.props.task}</li>
	}
}

Item.propTypes = {
	onClick:PropTypes.func,   //App.js :53 (第53行) return <Item key={index} task={item} handleDel={true}/> 报错
}
export default Item