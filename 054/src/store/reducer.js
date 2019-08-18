import {CLICK_BTN,CHANGE_ITEM,CLICK_ITEM,GET_DATA} from './actionConstant.js'


const defaultState = {
    list:[],
    task:''
}

export default (state=defaultState,action)=>{
	const newState = JSON.parse(JSON.stringify(state))
	if (action.type == CHANGE_ITEM) {
		// state.task = action.payLoad  错误写法！
		/* 
			传进来的state是store中的，所有组件皆可访问，
			贸然更改，可能造成其他组件混乱！
			应创建一个新的state进行更改，再交由store处理更新
		 */
		// const newState = JSON.parse(JSON.stringify(state))

		newState.task = action.payLoad

		return newState
	}else if(action.type == CLICK_BTN){
		newState.list.push(state.task)
		newState.task = ''
		return newState
	}else if(action.type == CLICK_ITEM){
		newState.list.splice(action.payLoad,1)
		return newState
	}else if(action.type == GET_DATA){
		newState.list = action.payLoad
		return newState
	}
    return state
}