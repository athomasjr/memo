import { combineReducers } from 'redux'
import memos from './memosReducer'
import users from './usersReducer'
import notifications from './notificationsReducer'

const reducer = combineReducers({
	memos,
	users,
	notifications,
})

export default reducer
