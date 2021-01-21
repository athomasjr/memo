import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'

export default function ReduxStore() {
	const middleWare = [thunk]
	const store = createStore(
		reducer,
		composeWithDevTools(applyMiddleware(...middleWare))
	)
	return store
}
