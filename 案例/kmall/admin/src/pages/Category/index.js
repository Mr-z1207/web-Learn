import React,{ Component } from 'react'
import "./index.css"

import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
} from "react-router-dom"

import list from 'pages/Category/list.js'
import CategoryAdd from 'pages/Category/add.js'

class Category extends Component{
	constructor(props){
        super(props)
    }
	render() {
		return (
			<Switch>
				<Route exact path="/Category/" component={list}/>
				<Route exact path="/Category/add" component={CategoryAdd}/>
			</Switch>
		)
	}
}

export default Category