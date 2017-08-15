import {combineReducers} from 'redux'

//HERE IMPORT REDUCERS TO BE COMBINED

import {usersReducer} from './usersReducer'


export default combineReducers({
	users:usersReducer
})