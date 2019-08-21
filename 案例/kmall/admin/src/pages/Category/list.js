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
				width:'30%',
				render:(name,record)=><Input 
					style={{width:'60%'}}
					defaultValue={name}
					onBlur={
						(ev)=>{
							if(ev.target.value != name){
								handleUpdateName(record._id,ev.target.value)    
							}
						}
					}
				/>
			},
			{
				title: '手机分类名称',
				dataIndex: 'mobileName',
				key: 'mobileName',
				width:'30%',
				render:(mobileName,record)=><Input 
					style={{width:'60%'}}
					defaultValue={mobileName}
					onBlur={
                        (ev)=>{
                            if(ev.target.value != mobileName){
                                handleUpdateMobileName(record._id,ev.target.value)    
                            }
                        }
                    }
				/>
			},
			{
				title: '是否显示',
				dataIndex: 'isShow',
				key: 'isShow',
				render:(isShow,record)=><Switch 
					checkedChildren="显示" 
					unCheckedChildren="隐藏" 
					checked={isShow == '0' ? false : true}
					onChange={
						(checked)=>{
							handleUpdateIsShow(record._id,checked ? '1' : '0')
						}
					} 
				/>
			},
			{
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render:(order,record)=><InputNumber 
                    defaultValue={order}
                    onBlur={
                        (ev)=>{
                            if(ev.target.value != order){
                                handleUpdateOrder(record._id,ev.target.value)    
                            }
                        }
                    }
                />                 
            },
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
					<Breadcrumb.Item>分类管理</Breadcrumb.Item>
					<Breadcrumb.Item>分类列表</Breadcrumb.Item>
				</Breadcrumb>
				<Link to='/Category/add' style={{float:'right'}}>
					<Button type="primary">添加分类</Button>
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
	columns:state.get('category').get('columns')
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