import React,{ Component } from 'react'
import api from 'api'
import { Layout, Menu, Icon ,Dropdown, Button, message } from 'antd';

const { Header } = Layout;

import "./index.css"
import { getUsername, removeUsername } from 'util'

class AdminHeader extends Component{
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this)
	}
	handleLogout(){
		// axios({
  //           method: 'delete',
  //           url: 'http://127.0.0.1:3000/sessions/users'
  //       })
        api.logout()
        .then(result=>{
        	console.log(result)
        	if (result.code == 0) {
        		removeUsername()
        		window.location.href = "/"
        	} else {
        		message.error(data.message)
        	}
        })
        .catch(err=>{
        	message.error('网络错误，请重试')
        })
	}
	render() {
		const menu = (
			<Menu>
				{/*<Menu.Divider />*/}
				<Menu.Item key="1" onClick={this.handleLogout}>
					<Icon type="logout" />退出
				</Menu.Item>
			</Menu>
		);
		return(
			<Header className="header">
				<div className="logo">
					KMALL
				</div>
				<Dropdown overlay={menu} trigger={['click']}>
					<a className="ant-dropdown-link" href="#">
						<Button ghost> { getUsername() } <Icon type="down" /></Button>
					</a>
				</Dropdown>
			</Header>
		)
	}
}

export default AdminHeader