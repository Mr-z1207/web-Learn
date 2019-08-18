//目标 导出一个对象 对象的属性是方法名,对象的值是方法


import axios from 'axios'

import { SERVER,API_CONFIG } from './config.js'

import { removeUsername } from 'util'

const getApiObj = (apiConfig)=>{
    const apiObj = {}

    for(let key in apiConfig){
    	apiObj[key]=(data)=>{
    		let url = apiConfig[key][0] || ''
            url = SERVER + url
            let method = apiConfig[key][1] || 'get'
            return request(url,method,data)
    	}
    }

    return apiObj
}

const request = (url,method,data)=>{
	return new Promise((resolve,reject)=>{
		const options = {
            method: method,
            url:url,
            withCredentials:true,
        }
        switch(options.method.toUpperCase()){
            case 'GET':
            case 'DELETE':
                options.params = data
                break
            default:
                options.data = data
        }
        axios(options)
		.then(result=>{
            const data  = result.data
            if (data.code == 10) {
                removeUsername()
                window.location.href = "/"
                reject(err)
            }
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
	})
}


export default getApiObj(API_CONFIG)