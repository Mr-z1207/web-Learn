import * as Type from './actionConstant.js'
const { fromJS } = require('immutable');

const defaultState = fromJS({
	list:[],
	categories:[],
	current:1,
	pageSize:0,
	total:0,
})

export default (state=defaultState,action)=>{
	if (action.type == Type.SET_CATEGORIES) {
		return state.set('categories',fromJS(action.payLoad))
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
    return state
}