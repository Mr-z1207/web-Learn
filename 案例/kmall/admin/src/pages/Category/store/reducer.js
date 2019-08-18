import * as Type from './actionConstant.js'
const { fromJS } = require('immutable');

const defaultState = fromJS({
	dataList:[],
	current:1,
	pageSize:0,
	total:0,
	spinning:false,
})

export default (state=defaultState,action)=>{
	if (action.type == Type.GET_USERDATA) {
		return state.merge({
			dataList:fromJS(action.payLoad.list),
			current:action.payLoad.current,
			pageSize:action.payLoad.pageSize,
			total:action.payLoad.total,
		})
	}
	if (action.type == Type.GETUSER_REQEST_START) {
		return state.set('spinning',true)		
	}
	if (action.type == Type.GETUSER_REQEST_DONE) {
		return state.set('spinning',false)
	}
    return state
}