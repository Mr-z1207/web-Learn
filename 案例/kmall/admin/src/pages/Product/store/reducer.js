import * as Type from './actionConstant.js'
const { fromJS } = require('immutable');

const defaultState = fromJS({
	list:[],
	categories:[],
	current:1,
	pageSize:0,
	total:0,

	mainImg:'',
	imgs:'',
	detail:'',

	mainImgValidateStatus:'',
	mainImgHelp:'',
	imgsValidateStatus:'',
	imgsHelp:'',
	detailValidateStatus:'',
	detailHelp:'',

	category:'',
	name:'',
	description:'',
	price:'',
    stock:'',
    detail:'',
})

export default (state=defaultState,action)=>{
	if (action.type == Type.SET_CATEGORIES) {
		return state.set('categories',fromJS(action.payLoad))
	}
	if (action.type == Type.SET_MAIN_IMAGE) {
		return state.merge({
			mainImg:action.payLoad,
			mainImgValidateStatus:'',
			mainImgHelp:'',
		})
	}
	if (action.type == Type.SET_IMAGES) {
		return state.merge({
			imgs:action.payLoad,
			imgsValidateStatus:'',
			imgsHelp:'',
		})
	}
	if (action.type == Type.SET_DETAIL) {
		return state.set('detail',action.payLoad)
	}
	if (action.type == Type.SET_MAIN_IMAGE_ERROR) {
		return state.merge({
			mainImgValidateStatus:'error',
			mainImgHelp:'请上传商品封面',
		})
	}
	if (action.type == Type.SET_IMAGES_ERROR) {
		return state.merge({
			imgsValidateStatus:'error',
			imgsHelp:'请上传商品图片',
		})
	}
	if (action.type == Type.SET_PAGE) {
		// console.log(action.payLoad)
		return state.merge({
			list:fromJS(action.payLoad.list),
			current:action.payLoad.current,
			pageSize:action.payLoad.pageSize,
			total:action.payLoad.total,
		})
	}
	if (action.type == Type.SET_PRODUCT_DETAIL) {
		console.log("aaaa:::::",action.payLoad)
		return state.merge({
			category:action.payload.category._id,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
		    stock:action.payload.stock,
		    detail:action.payload.detail,
		    mainImage:action.payload.mainImage,
            images:action.payload.images,
		})
	}
    return state
}