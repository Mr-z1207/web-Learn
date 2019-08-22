import './App.css'
import React,{ Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { 
    BrowserRouter as Router, 
    Route, 
    Link,
    Switch,
    Redirect,
} from "react-router-dom"


import Login from 'pages/Login/'
import Home from 'pages/Home/'
import User from 'pages/User/'
import Category from 'pages/Category/'
import Product from 'pages/Product/'
import Err from 'common/Err/'
import { getUsername } from 'util'

class App extends Component{
	render(){
		const ProtectedRoute = ({ component: Component, ...rest }) => (
			<Route 
				{...rest} 
				render={props => {
						return getUsername() ? <Component {...props} /> : <Redirect to='/Login'/>
					}
				} 
			/>
		)
		const LoginRoute  = ({ component: Component, ...rest }) => (
			<Route 
				{...rest} 
				render={props => {
						return getUsername() ? <Redirect to='/' /> : <Component {...props} />
					}
				}
			/>
		)
		return (
			<Router forceRefresh={true}>
                 <Switch>
                 	<LoginRoute path="/Login" component={Login} />
	                <ProtectedRoute exact path="/" component={Home} />
	                <ProtectedRoute exact path="/User" component={User} />
	                <ProtectedRoute path="/Category" component={Category} />
	                <ProtectedRoute path="/Product" component={Product} />
	                <Route component={Err}/>
                </Switch>
			</Router>
		)
	}
}

export default App