import * as TDL_Type from './actionConstant.js'

const ChangeAction=(task)=> ({
	type:TDL_Type.CHANGE_ITEM,
	payLoad:task
})
const ClickAction=()=> ({
	type:TDL_Type.CLICK_BTN
})
const DelAction=(index)=> ({
	type:TDL_Type.CLICK_ITEM,
	payLoad:index
})
const GetData=(data)=> ({
	type:TDL_Type.GET_DATA,
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