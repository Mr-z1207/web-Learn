import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'

ReactDOM.render(<App />,document.getElementById('box'));

// import { DatePicker } from 'antd';
// ReactDOM.render(<DatePicker />, document.getElementById('box'));
// function getDate() {
// 	const elem = (
// 		<div>
// 			<h1>时间</h1>
// 			<p>{new Date().toLocaleString()}</p>
// 		</div>
// 		)
// 	ReactDOM.render(elem,document.getElementById('box'));
// }
// setInterval(()=>{
// 	getDate()
// },1000)