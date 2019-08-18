import React,{ Component } from 'react'
import { Card, Col, Row, Breadcrumb } from 'antd';


import "./index.css"
import { connect } from 'react-redux'
import { Action } from './store'

import AdminLayout from 'common/Layout'

class Home extends Component{
	constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.handleCount()
    }
	render() {
		const {usernum,ordernum,productnum } = this.props
		return <div>
			<AdminLayout>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: '30px' }}>
					<Row gutter={16}>
						<Col span={8}>
							<Card title="用户数" bordered={true}>
								<p>{usernum}</p>
							</Card>
						</Col>
						<Col span={8}>
							<Card title="商品数" bordered={true}>
								<p>{productnum}</p>
							</Card>
						</Col>
						<Col span={8}>
							<Card title="订单数" bordered={true}>
								<p>{ordernum}</p>
							</Card>
						</Col>
					</Row>
				</div>
			</AdminLayout>
		</div>;
	}
}

const mapStateToProps = (state)=>({
	usernum:state.get('home').get('usernum'),
    ordernum:state.get('home').get('ordernum'),
    productnum:state.get('home').get('productnum')
})

const mapDispatchToProps = (dispatch)=>({
	handleCount:()=>{
		dispatch(Action.getCountAction())
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)