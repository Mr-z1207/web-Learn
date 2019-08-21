import React,{ Component } from 'react'
import { NavLink } from "react-router-dom"

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

import "./index.css"

class AdminSider extends Component{
	render() {
		return(
		    <Sider width={200} style={{ background: '#fff' }}>
				<Menu
					mode="inline"
					style={{ height: '100%', borderRight: 0 }}
				>
					<Menu.Item key="1">
						<NavLink exact to="/"><Icon type="home" />首页</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/User"><Icon type="user" />用户管理</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/Category"><Icon type="bar-chart" />分类管理</NavLink>
					</Menu.Item>
					<Menu.Item key="4">
						<NavLink to="/Product"><Icon type="shop" />商品管理</NavLink>
					</Menu.Item>
				</Menu>
			</Sider>
	    )
	}
}

export default AdminSider