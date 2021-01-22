import * as types from '../types'

//* ------------------------- Users -------------------------------->
export const authUser = (user) => ({
	type: types.REGISTER_USER,
	payload: user,
})

//* ------------------------- Notifications -------------------------------->

export const errorGlobal = (msg) => ({
	type: types.ERROR_GLOBAL,
	payload: msg,
})
export const successGlobal = (msg) => ({
	type: types.SUCCESS_GLOBAL,
	payload: msg,
})
