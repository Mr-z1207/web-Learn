import * as Type from './actionConstant.js'
import { message } from 'antd'

import api from 'api'

const setCategoriesAction = (payLoad)=>({
    type:Type.SET_CATEGORIES,
    payLoad
})
const getCategoriesAction = ()=>{
    return (dispatch,getState)=>{
        api.getlevelCategories({
            level:3
        })
        .then(result=>{
            if(result.code == 0){
                dispatch(setCategoriesAction(result.data))
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })              
    }
}

const setMainImageAction = (fileList)=>({
    type:Type.SET_MAIN_IMAGE,
    payLoad:fileList
})
const setImagesAction = (fileList)=>({
    type:Type.SET_IMAGES,
    payLoad:fileList
})
const setDetailAction = (values)=>({
    type:Type.SET_DETAIL,
    payLoad:values
})

const getSaveAction = (values)=>{
    return (dispatch,getState)=>{
        console.log(values)
    }
}
export {
    getCategoriesAction,
    setMainImageAction,
    setImagesAction,
    setDetailAction,
    getSaveAction,
}