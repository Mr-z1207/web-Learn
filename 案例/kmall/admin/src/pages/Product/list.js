import React,{ Component } from 'react'
import { Breadcrumb, Button, Table, Input, InputNumber, Switch } from 'antd';
import moment from 'moment'

import "./index.css"
import { connect } from 'react-redux'
import { Action } from './store'

import { 
		BrowserRouter as Router, 
		Route,
		Link
} from "react-router-dom"

import AdminLayout from 'common/Layout'


class CategoryList extends Component{
	constructor(props){
			super(props)
		}
	componentDidMount(){
       this.props.getCategoryData(1)
    }
	render() {
		const columns = [
			{
				title: '分类名称',
				dataIndex: 'name',
				key: 'name',
			}
		]

		const { 
			List,
			current,
			pageSize,
			total,
			getCategoryData,
			handleUpdateName,
			handleUpdateMobileName,
			handleUpdateOrder,
			handleUpdateIsShow,
		} = this.props
		const data = List.toJS()
		return <div>
			<AdminLayout>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
					<Breadcrumb.Item>商品列表</Breadcrumb.Item>
				</Breadcrumb>
				<Link to='/Product/save' style={{float:'right'}}>
					<Button type="primary">新增商品</Button>
				</Link>
				<div style={{ padding: '30px' }}>
					<Table 
						// loading={
						// 	{
						// 		size:'large',
						// 		// spinning:spinning,
						// 		// tip:'一大波用户正在努力赶来'
						// 	}
						// }
						columns={columns} 
						dataSource={data}
						pagination={{current,pageSize,total}}
						onChange={(page)=>{
							getCategoryData(page.current)
						}}
					/>
				</div>
			</AdminLayout>
		</div>;
	}
}

const mapStateToProps = (state)=>({
	List: state.get('category').get('list'),
	current:state.get('category').get('current'),
	pageSize:state.get('category').get('pageSize'),
	total:state.get('category').get('total'),
})

const mapDispatchToProps = (dispatch)=>({
	getCategoryData:(page)=>{
		dispatch(Action.getCategoryDataAction(page))
	},
	handleUpdateName:(id,newName)=>{
        dispatch(Action.getUpdateNameAction(id,newName))
    },
    handleUpdateMobileName:(id,newMobileName)=>{
        dispatch(Action.getUpdateMobileNameAction(id,newMobileName))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(Action.getUpdateOrderAction(id,newOrder))
    },
    handleUpdateIsShow:(id,newIsShow)=>{
        dispatch(Action.getUpdateUpdateIsShowAction(id,newIsShow))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)