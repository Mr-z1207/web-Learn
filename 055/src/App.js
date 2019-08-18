import React,{ Component } from 'react'
import ToDoList from './pages/ToDoList/'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component{
    render(){
        return <h2>this is home page</h2>
    }
}

class App extends Component{
	render(){
		return (
			<Router>
				<nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/ToDoList">ToDoList</Link></li>
                        <li><Link to="/about">about</Link></li>
                    </ul>
                </nav>
                <Route path="/" exact component={Home} />
                <Route path="/ToDoList" component={ToDoList} />
                <Route path="/about" render={()=><h2>this is about page</h2>} />
			</Router>
		)
	}
}

export default App