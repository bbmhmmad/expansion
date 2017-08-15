export const usersReducer= function(state = {users:[],current_user:{},msg:''},action){
	switch(action.type){
		case'POST_USER':
		return {...state,current_user:action.payload._id,admin:action.payload.admin}
		break;
		case'POST_USER_REJECTED':
		return {...state,msg:action.payload}
		break;

	}
	return state
}