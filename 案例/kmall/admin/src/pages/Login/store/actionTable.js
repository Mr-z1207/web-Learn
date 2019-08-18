import * as Type from './actionConstant.js'
import { message } from 'antd'

import { saveUsername } from 'util'
import api from 'api'

import axios from 'axios'


const getLoginReqestStartAction = ()=>({
    type:Type.LOGIN_REQEST_START,
})
const getLoginReqestDoneAction = ()=>({
    type:Type.LOGIN_REQEST_DONE,
})

const SubAction = (values)=>{
    return (dispatch,getState)=>{
        dispatch(getLoginReqestStartAction())
        values.role = 'admin'
        /*
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/sessions/users',
            // withCredentials:true,
            data: values
        })
        */
        api.login(values)
        .then(result=>{
            if (result.code == 0) {
                // 1、存登录信息
                saveUsername(result.data.username)
                // 2.跳转到后台首页
                window.location.href = "/"
            } else {
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误，请重试')
        })
        .finally(()=>{
            dispatch(getLoginReqestDoneAction())
        })
    }
}

export {getLoginReqestStartAction,getLoginReqestDoneAction,SubAction}