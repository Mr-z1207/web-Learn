import React,{ Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';


import "./index.css"
import { connect } from 'react-redux'
import { Action } from './store'

class NormalLoginForm extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				console.log(this.props.isFetching)
				this.props.handleLogin(values)
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
		<div className="Login">
			<Form className="login-form">
				<Form.Item>
					{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z][a-z0-9_]{2,7}$/,message:'用户名为3-8个字符，且以字母开头'}],
						})(
						<Input
							prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="请输入用户名"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请输入密码' },{pattern:/^[a-z0-9_]{3,8}$/,message:'密码为3-8个字符，只能包含字母数字下划线'}],
						})(
						<Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="请输入密码"
						/>,
					)}
				</Form.Item>
				<Form.Item>
					<Button 
						type="primary" 
						className="login-form-button" 
						onClick={this.handleSubmit}
						loading={this.props.isFetching}
					>
						登录
					</Button>
				</Form.Item>
			</Form>
		</div>
		);
	}
}

const mapStateToProps = (state)=>({
	 isFetching: state.get('login').get('isFetching')
})

const mapDispatchToProps = (dispatch)=>({
	handleLogin:(values)=>{
		dispatch(Action.SubAction(values))
	}
})

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)