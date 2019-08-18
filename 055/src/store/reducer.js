// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as ToDoListReducer } from '../pages/ToDoList/store'

export default combineReducers({
    todolist:ToDoListReducer
})