import * as action from './index'
import axios from 'axios'

// axios.defaults.headers.post['Content-Type'] = 'application/json'

export const authUser = (values, route) => async (dispatch) => {
	try {
		const { email, password } = values
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`/api/users/${route}`,
			{ email, password },
			config
		)

		dispatch(action.authUser(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		console.log(error)
	}
}
