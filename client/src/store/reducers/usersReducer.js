import * as types from '../types'

export default function userReducer(state = {}, action) {
	switch (action.type) {
		case types.REGISTER_USER:
			return { ...state, userInfo: action.payload }
		default:
			return state
	}
}
