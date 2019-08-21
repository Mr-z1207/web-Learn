// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as LoginReducer } from 'pages/Login/store'
import { reducer as HomeReducer } from 'pages/Home/store'
import { reducer as UserReducer } from 'pages/User/store'
import { reducer as CategoryReducer } from 'pages/Category/store'
import { reducer as ProductReducer } from 'pages/Product/store'

export default combineReducers({
    login:LoginReducer,
    home:HomeReducer,
    user:UserReducer,
    category:CategoryReducer,
    product:ProductReducer,
})