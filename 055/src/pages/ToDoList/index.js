import React,{ Component } from 'react'
import { Input,Button,List, Typography,Row,Col } from 'antd';

import { connect } from 'react-redux'
import { TDL_Action } from './store'

class ToDoList extends Component{
	render(){
		const {handleChange,task,handleClick,list,handleDel} = this.props
		return (
			<React.Fragment>
				<Row type="flex" justify="center" style={{marginTop:50}}>
					<Col span={12}>
						<Input 
							placeholder="Basic usage" 
							onChange={handleChange} 
							value={task}
						/>
					</Col>
					<Col>
						<Button type="primary" onClick={handleClick}>提交</Button>
					</Col>
				</Row>
				<Row type="flex" justify="center">
					<Col span={13}>
						<List
			              style={{marginTop:10}}
			              bordered
			              dataSource={list}
			              renderItem={(item,index) => (
			                <List.Item
			                    onClick={()=>{
			                    	handleDel(index)
			                    }}
			                >
			                   {item}
			                </List.Item>
			              )}
			            />
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state)=>({
	task:state.get('todolist').get('task'),
    list:state.get('todolist').get('list')      
})

const mapDispatchToProps = (dispatch)=>({
	handleClick:()=>{
		dispatch(TDL_Action.ClickAction())
	},
	handleChange:(ev)=>{
		const task = ev.target.value
		dispatch(TDL_Action.ChangeAction(task))
	},
	handleDel:(index)=>{
		dispatch(TDL_Action.DelAction(index))
	}
})


export default connect(mapStateToProps,mapDispatchToProps)(ToDoList)