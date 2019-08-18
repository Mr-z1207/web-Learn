import * as Type from './actionConstant.js'
import { message } from 'antd'

// import { saveUsername } from 'util'

import api from 'api'

const getSetCountAction  = (data)=>({
    type:Type.SET_COUNT,
    payLoad:data
})

const getCountAction = ()=>{
    return (dispatch,getState)=>{
        api.getHomeData()
        .then(result=>{
            if(result.code == 0){
                dispatch(getSetCountAction(result.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export {getCountAction}