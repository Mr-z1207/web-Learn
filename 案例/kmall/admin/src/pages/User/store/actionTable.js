import * as Type from './actionConstant.js'
import { message } from 'antd'

// import { saveUsername } from 'util'

import api from 'api'

const UserDataAction  = (data)=>({
    type:Type.GET_USERDATA,
    payLoad:data
})
const getUserStart  = (data)=>({
    type:Type.GETUSER_REQEST_START
})
const getUserDone  = (data)=>({
    type:Type.GETUSER_REQEST_DONE
})

const getUserDataAction = (page)=>{
    return (dispatch,getState)=>{
        dispatch(getUserStart())
        api.getUserData({
            page:page
        })
        .then(result=>{
            if (result.code == 0) {
                // console.log(result.data)
                dispatch(UserDataAction(result.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(()=>{
            dispatch(getUserDone())
        })
    }
}

export {getUserDataAction}