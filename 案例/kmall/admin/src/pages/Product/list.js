import React,{ Component } from 'react'
import { Breadcrumb, Button, Table, Input, InputNumber, Switch, Divider } from 'antd';
const { Search } = Input
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


class ProductList extends Component{
	constructor(props){
			super(props)
		}
	componentDidMount(){
		this.props.handlePage()
    }
	render() {
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
				render:(name)=>{
					if (keyword) {
						const reg = new RegExp('('+keyword+')','ig')
						const html = name.replace(reg,'<b style="color:#ff6700"}}>$1</b>')
						return <span dangerouslySetInnerHTML={{__html:html}} ></span>
					}else{
						return name
					}
				}
			},
			{
				title: '首页显示',
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
				title: '上架/下架',
                dataIndex: 'status',
                key: 'status',
				render:(status,record)=><Switch 
					checkedChildren="显示" 
					unCheckedChildren="隐藏" 
					checked={status == '0' ? false : true}
					onChange={
						(checked)=>{
							handleUpdateStatus(record._id,checked ? '1' : '0')
						}
					} 
				/>
			},
			{
				title: '热卖商品',
                dataIndex: 'isHot',
                key: 'isHot',
				render:(isHot,record)=><Switch 
					checkedChildren="显示" 
					unCheckedChildren="隐藏" 
					checked={isHot == '0' ? false : true}
					onChange={
						(checked)=>{
							handleUpdateIsHot(record._id,checked ? '1' : '0')
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
            {
				title: '操作',
				render:(text,record)=><span>
                    <Link to={"/product/save/"+record._id}>修改</Link>
                    <Divider type="vertical" />
                    <Link to={"/product/detail/"+record._id}>查看</Link>
                </span>
			},
		]

		const { 
			List,
			current,
			pageSize,
			total,
			handlePage,
			handleUpdateIsShow,
			handleUpdateStatus,
			handleUpdateIsHot,
			handleUpdateOrder,
			keyword,
		} = this.props
		const data = List.toJS()
		// console.log(data)
		return <div>
			<AdminLayout>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
					<Breadcrumb.Item>商品列表</Breadcrumb.Item>
				</Breadcrumb>
				<Search 
                    placeholder="请输入商品名称关键字" 
                    onSearch={
                        value => handlePage(1,value)
                    } 
                    enterButton 
                    style={{ width: 300 }}
                />
				<Link to='/Product/save' style={{float:'right'}}>
					<Button type="primary">新增商品</Button>
				</Link>
				<div style={{ padding: '30px' }}>
					<Table 
						rowKey='_id'
						columns={columns} 
						dataSource={data}
						pagination={{current,pageSize,total}}
						onChange={
                            (page)=>{
                                handlePage(page.current,keyword)
                            }
                        }
					/>
				</div>
			</AdminLayout>
		</div>;
	}
}

const mapStateToProps = (state)=>({
	List: state.get('product').get('list'),
	current:state.get('product').get('current'),
	pageSize:state.get('product').get('pageSize'),
	total:state.get('product').get('total'),
	categories:state.get('product').get('categories'),
	keyword:state.get('product').get('keyword')
})

const mapDispatchToProps = (dispatch)=>({
	handlePage:(page,keyword)=>{
        dispatch(Action.getProductDataAction(page,keyword))
    },
    handleUpdateIsShow:(id,newIsShow)=>{
        dispatch(Action.getUpdateIsShowAction(id,newIsShow))
    },
	handleUpdateStatus:(id,newStatus)=>{
        dispatch(Action.getUpdateStatusAction(id,newStatus))
    },
	handleUpdateIsHot:(id,newIsHot)=>{
        dispatch(Action.getUpdateIsHotAction(id,newIsHot))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(Action.getUpdateOrderAction(id,newOrder))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)