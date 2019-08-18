import * as TDL_Type from './actionConstant.js'
const { fromJS } = require('immutable');


const defaultState = fromJS({
    list:["1","2"],
    task:''
})

export default (state=defaultState,action)=>{
	if (action.type == TDL_Type.CHANGE_ITEM) {
		// state.task = action.payLoad  错误写法！
		/* 
			传进来的state是store中的，所有组件皆可访问，
			贸然更改，可能造成其他组件混乱！
			应创建一个新的state进行更改，再交由store处理更新
		 */
		return state.set('task',action.payLoad)
	}else if(action.type == TDL_Type.CLICK_BTN){
		const list = [...state.get('list')]
        list.push(state.get('task'))
        return state.merge({
            list,
            task:''
        })
	}else if(action.type == TDL_Type.CLICK_ITEM){
		const list = [...state.get('list')]
        list.splice(action.payLoad,1)
        return state.set('list',list)
	}else if(action.type == TDL_Type.GET_DATA){
		return state.set('list',action.payLoad)
	}
    return state
}