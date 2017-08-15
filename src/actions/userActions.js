'use strict'

import axios from 'axios'

export function postUser(user){
	return function(dispatch){
		axios.post('/users/create',user)
		.then(function(response){
			dispatch({type:'POST_USER',payload:response.data})
		})
		.catch(function(err){
			dispatch({type:'POST_USER_REJECTED',payload:err.response.data.message})
		})
	}
	
}

