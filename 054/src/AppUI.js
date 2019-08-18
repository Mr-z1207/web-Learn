import React,{ Component } from 'react'
import { Input,Button,List, Typography,Row,Col } from 'antd';

const AppUI=(props)=>{
	const {handleChange,task,handleClick,list,handleDel} = props
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
export default AppUI