import React,{ Component } from 'react'
import "./index.css"

import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
} from "react-router-dom"

import list from 'pages/Product/list.js'
import ProductSave from 'pages/Product/save.js'
import ProductDetail from 'pages/Product/detail.js'

class Category extends Component{
	constructor(props){
        super(props)
    }
	render() {
		return (
			<Switch>
				<Route exact path="/Product/" component={list}/>
				<Route exact path="/Product/save/:ProductId?" component={ProductSave}/>
				<Route path="/product/detail/:productId?" component={ProductDetail} />
				{/* :ProductId?  加问号，匹配正则 */}
			</Switch>
		)
	}
}

export default Category