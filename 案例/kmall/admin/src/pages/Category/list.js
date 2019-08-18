import React,{ Component } from 'react'
import { Breadcrumb } from 'antd';
import moment from 'moment'

import "./index.css"
import { connect } from 'react-redux'
import { Action } from './store'

import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link
} from "react-router-dom"

import AdminLayout from 'common/Layout'


class User extends Component{
	constructor(props){
        super(props)
    }
	render() {
		return <div>
			<AdminLayout>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
					<Breadcrumb.Item>用户列表</Breadcrumb.Item>
				</Breadcrumb>
				<Link to='/Category/add'>添加分类</Link>
				<div style={{ padding: '30px' }}>
					
				</div>
			</AdminLayout>
		</div>;
	}
}

const mapStateToProps = (state)=>({
	
})

const mapDispatchToProps = (dispatch)=>({
	
})

export default connect(mapStateToProps,mapDispatchToProps)(User)