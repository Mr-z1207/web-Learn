import React,{ Component } from 'react'
import "./index.css"

import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
} from "react-router-dom"

import list from 'pages/Product/list.js'
import ProductSave from 'pages/Product/save.js'

class Category extends Component{
	constructor(props){
        super(props)
    }
	render() {
		return (
			<Switch>
				<Route exact path="/Product/" component={list}/>
				<Route exact path="/Product/save" component={ProductSave}/>
			</Switch>
		)
	}
}

export default Category