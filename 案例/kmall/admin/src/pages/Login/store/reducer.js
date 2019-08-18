import * as Type from './actionConstant.js'
const { fromJS } = require('immutable');


const defaultState = fromJS({
    isFetching:false
})

export default (state=defaultState,action)=>{
	if (action.type == Type.LOGIN_REQEST_START) {
		return state.set('isFetching',true)
	}
	if (action.type == Type.LOGIN_REQEST_DONE) {
		return state.set('isFetching',false)
	}
    return state
}