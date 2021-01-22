import * as types from '../types'

export default function notificationsReducer(state = {}, action) {
	switch (action.type) {
		case types.SUCCESS_GLOBAL:
			return { ...state, success: true, msg: action.payload }
		case types.ERROR_GLOBAL:
			return { ...state, error: true, msg: action.payload }
		default:
			return state
	}
}
