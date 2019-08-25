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
const mainImgValidateStatusAction = ()=>({
    type:Type.SET_MAIN_IMAGE_ERROR
})
const imgsValidateStatusAction = ()=>({
    type:Type.SET_IMAGES_ERROR
})
const getSaveAction = (err,values)=>{
    return (dispatch,getState)=>{
        const state = getState()
        const MainImage = state.get('product').get('mainImg')
        const Images = state.get('product').get('imgs')
        const Detail = state.get('product').get('detail')

        let hasErr = false
        if(err){
            hasErr = true
        }
        if (!MainImage) {
            hasErr = true
            dispatch(mainImgValidateStatusAction())
        }
        if (!Images) {
            hasErr = true
            dispatch(imgsValidateStatusAction())
        }
        if (hasErr) {
            return
        }
        let request = api.saveProducts
        if(values.id){
            request = api.updateProducts
        }
        console.log('MainImage',MainImage)
        console.log('Images',Images)
        console.log('Detail',Detail)
        request({
            ...values,
            MainImage,
            Detail,
            Images
        })
        .then(result=>{
            if(result.code == 0){
                message.success(result.message,()=>{
                    window.location.href = '/Product'
                })
            }else{
                message.error(result.message)
            }
            
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })
    }
}

const getProductDataAction = (page,keyword)=>{
    return (dispatch,getState)=>{
        const options = {
           page:page 
        }
        if(keyword){
            options.keyword = keyword
        }
        api.getProductsList(options)
        .then(result=>{
            if(result.code == 0){
                // console.log('result:::',result)
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取商品数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        }) 
    }
}

const getSetPageAction = (payLoad)=>({
    type:Type.SET_PAGE,
    payLoad
})

const getUpdateIsShowAction = (id,newIsShow)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsIsShow({
            id:id,
            isShow:newIsShow,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新显示隐藏成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
const getUpdateStatusAction = (id,newStatus)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsStatus({
            id:id,
            status:newStatus,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新显示隐藏成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
const getUpdateIsHotAction = (id,newIsHot)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsIsHot({
            id:id,
            isHot:newIsHot,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新显示隐藏成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
const getUpdateOrderAction = (id,newOrder)=>{
    return (dispatch,getState)=>{
        const page = getState().get('product').get('current')
        api.updateProductsOrder({
            id:id,
            order:newOrder,
            page:page
        })
        .then(result=>{
            if(result.code == 0){
                message.success('更新排序成功')
                dispatch(getSetPageAction(result.data))
            }else{
                message.error(result.message)
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })               
    }
}
const setProductDetailAction = (payLoad)=>({
    type:Type.SET_PRODUCT_DETAIL,
    payLoad
})
const getProductDetailAction = (productId)=>{
    return (dispatch,getState)=>{
        api.getProductDetail({
            id:productId
        })
        .then(result=>{
            console.log('result',result.data)
            if(result.code == 0){
                dispatch(setProductDetailAction(result.data))
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })              
    }
}
export {
    getCategoriesAction,
    setMainImageAction,
    setImagesAction,
    setDetailAction,
    getSaveAction,
    getProductDataAction,
    getUpdateIsShowAction,
    getUpdateStatusAction,
    getUpdateIsHotAction,
    getUpdateOrderAction,
    getProductDetailAction,
}