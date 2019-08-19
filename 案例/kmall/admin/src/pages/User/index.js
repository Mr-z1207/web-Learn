import React,{ Component } from 'react'
import { Breadcrumb, Table, Divider, Tag } from 'antd';
import moment from 'moment'


import "./index.css"
import { connect } from 'react-redux'
import { Action } from './store'

import AdminLayout from 'common/Layout'

const IsAdmin = isAdmin=>{
	if (isAdmin === true) {
		return <Tag color={'green'}>&nbsp;&nbsp;是&nbsp;&nbsp;</Tag>
	} else {
		return <Tag color={'red'}>&nbsp;&nbsp;否&nbsp;&nbsp;</Tag>
	}
}
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: text => <a>{text}</a>,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '管理员',
    key: 'isAdmin',
    dataIndex: 'isAdmin',
    render: isAdmin => {
    	return (
    		<span>{IsAdmin(isAdmin)}</span>
		)
    },
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];


class User extends Component{
	constructor(props){
        super(props)
    }
    componentDidMount(){
       this.props.getUserData(1)
    }
	render() {
		const { UserData,current,pageSize,total,getUserData,spinning } = this.props
		const data = UserData.map(user=>{
			const time = moment(user.get('createdAt')).format('YYYY-MM-DD HH:MM')
			return {
				key:user.get('_id'),
				username:user.get('username'),
				email:user.get('email'),
				phone:user.get('phone'),
				isAdmin:user.get('isAdmin'),
				createdAt:time,
			}
		}).toJS()
		// console.log(current,pageSize,total)
		return <div>
			<AdminLayout>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
					<Breadcrumb.Item>用户管理</Breadcrumb.Item>
					<Breadcrumb.Item>用户列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: '30px' }}>
					<Table 
						loading={
							{
								size:'large',
								spinning:spinning,
								tip:'一大波用户正在努力赶来'
							}
						}
						columns={columns} 
						dataSource={data}
						pagination={{current,pageSize,total}}
						onChange={(page)=>{
							getUserData(page.current)
						}}
					/>
				</div>
			</AdminLayout>
		</div>;
	}
}

const mapStateToProps = (state)=>({
	UserData: state.get('user').get('dataList'),
	current:state.get('user').get('current'),
	pageSize:state.get('user').get('pageSize'),
	total:state.get('user').get('total'),
	spinning:state.get('user').get('spinning'),
})

const mapDispatchToProps = (dispatch)=>({
	getUserData:(page)=>{
		dispatch(Action.getUserDataAction(page))
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(User)