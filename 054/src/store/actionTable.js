import {CLICK_BTN,CHANGE_ITEM,CLICK_ITEM,GET_DATA} from './actionConstant.js'
import axios from'axios';

const ChangeAction=(task)=> ({
	type:CHANGE_ITEM,
	payLoad:task
})
const ClickAction=()=> ({
	type:CLICK_BTN
})
const DelAction=(index)=> ({
	type:CLICK_ITEM,
	payLoad:index
})
const GetData=(data)=> ({
	type:GET_DATA,
	payLoad:data
})
const LoadData = ()=>{
    return (dispatch,getState)=>{
        axios.get('http://127.0.0.1:3000')
        .then(result=>{
            dispatch(GetData(result.data))
        })
        .catch(err=>{
            console.log(err)
        })        
    }
}

export {ChangeAction,ClickAction,DelAction,LoadData}