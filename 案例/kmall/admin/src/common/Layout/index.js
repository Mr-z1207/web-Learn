import React,{ Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import "./index.css"
import AdminHeader from 'common/Header'
import AdminSider from 'common/Sider'

class AdminLayout extends Component{
	constructor(props){
        super(props)
    }
	render() {
		return(
		    <Layout>
			    <AdminHeader />
			    <Layout>
			      <AdminSider />
			      <Layout style={{ padding: '0 24px 24px' }}>
			        <Content
			          style={{
			            background: '#fff',
			            padding: 24,
			            margin: 0,
			            minHeight: 280,
			          }}
			        >
			           {this.props.children}
			        </Content>
			      </Layout>
			    </Layout>
			</Layout>
	    )
	}
}

export default AdminLayout