import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Action } from './store'
import "./index.css"

import { Breadcrumb,Form, Select, Input, Button,InputNumber } from 'antd'
const { Option } = Select
import AdminLayout from 'common/Layout'
import UploadImg from 'common/Upload-img'
import RichEditor from 'common/Rich-editor'

import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGES } from 'api/config'

class ProductSave extends Component{
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
        this.props.getCategories()
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSave(values)
            }
        })
    }
	render() {
		const { getFieldDecorator } = this.props.form
		const { categories,handleMainImage,handleImages,handleDetail } = this.props
		return (
			<AdminLayout>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
					<Breadcrumb.Item>新增商品</Breadcrumb.Item>
				</Breadcrumb>
				<div className="content">
				<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} >
					<Form.Item label="商品分类">
						{getFieldDecorator('category', {
							rules: [{ required: true, message: '请选择商品分类' }],
						})(
							<Select placeholder="请选择商品分类">
								{
									categories.map((category)=>{
										return <Option key={category.get('_id')} value={category.get('_id')}>{category.get('name')}</Option>
									})
								}
							</Select>,
						)}
					</Form.Item>
					<Form.Item label="商品名称">
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入商品名称' }],
						})(<Input />)}
					</Form.Item>
					<Form.Item label="商品描述">
						{getFieldDecorator('description', {
							rules: [{ required: true, message: '请输入商品描述' }],
						})(<Input />)}
					</Form.Item>
					<Form.Item label="商品价格">
						{getFieldDecorator('price', {
							rules: [{ required: true, message: '请输入商品价格' }],
						})(<InputNumber min={0} />)}
					</Form.Item>
					<Form.Item label="商品库存">
						{getFieldDecorator('stock', {
							rules: [{ required: true, message: '请输入商品库存' }],
						})(<InputNumber min={0} />)}
					</Form.Item>
					<Form.Item label="商品封面" required={true}>
						<UploadImg 
							max={1}
							action={UPLOAD_PRODUCT_IMAGE}
							getFileList={
								(fileList)=>{
									handleMainImage(fileList)
								}
							}
						/>
					</Form.Item>
					<Form.Item label="商品图片" required={true}>
						<UploadImg 
							max={3}
							action={UPLOAD_PRODUCT_IMAGE}
							getFileList={
								(fileList)=>{
									handleImages(fileList)
								}
							}
						/>
					</Form.Item>
					<Form.Item label="商品详情" required={true}>
						<RichEditor
							url={UPLOAD_PRODUCT_DETAIL_IMAGES}
							getValue={
								(values)=>{
									handleDetail(values)
								}
							}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 12, offset: 5 }}>
						<Button type="primary" onClick={this.handleSubmit}>
							提交
						</Button>
					</Form.Item>
				</Form>
				</div>                
			</AdminLayout>
		)
	}
}
const WrappedProductSave = Form.create({ name: 'product' })(ProductSave)
//映射属性到组件
const mapStateToProps = (state) => ({
	categories:state.get('product').get('categories')
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
	handleMainImage:(fileList)=>{
		dispatch(Action.setMainImageAction(fileList))
	},
	handleImages:(fileList)=>{
		dispatch(Action.setImagesAction(fileList))
	},
	handleDetail:(values)=>{
		dispatch(Action.setDetailAction(values))
	},
	handleSave:(values)=>{
		dispatch(Action.getSaveAction(values))
	},
	getCategories:()=>{
		dispatch(Action.getCategoriesAction())
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedProductSave)