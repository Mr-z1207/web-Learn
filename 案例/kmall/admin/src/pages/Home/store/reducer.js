import * as Type from './actionConstant.js'
const { fromJS } = require('immutable');


const defaultState = fromJS({
    usernum:0,
    ordernum:0,
    productnum:0
})

export default (state=defaultState,action)=>{
	if (action.type == Type.SET_COUNT) {
		return state.merge({
			usernum:action.payLoad.usernum,
			ordernum:action.payLoad.ordernum,
			productnum:action.payLoad.productnum
		})
	}
    return state
}