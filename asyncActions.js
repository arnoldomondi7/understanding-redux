const { createStore, applyMiddleware } = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

//we define 3 things, the state actions and the reducers.
//step1 state.
const initialState = {
	loading: false,
	data: [],
	error: '',
}

//step 2 create the actions.
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

//step 3. define the action creators.
//a. request to fetch the data.
const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUESTED,
	}
}
//if successfull we need to store there users.
const fetchUsersSuccess = users => {
	return {
		type: FETCH_USERS_SUCCEEDED,
		payload: users,
	}
}

//store the error message if the user request failed.
const fetchUsersFailed = error => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	}
}

//step 4 define the reducer function.
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUESTED:
			return {
				loading: true,
				users: [],
				error: '',
			}
		case FETCH_USERS_SUCCEEDED:
			return {
				loading: false,
				users: action.payload,
				error: '',
			}
		case FETCH_USERS_FAILED:
			return {
				loading: false,
				users: [],
				error: action.payload,
			}

		default:
			return state
	}
}

//functions to make the api request.
const fetchUsers = () => {
	return function (dispatch) {
		//before we make the api call we must dispatch the fetch users request.
		dispatch(fetchUsersRequest())
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				//for simplicity lets map the ids.
				//res.data is the data message.
				const users = response.data.map(user => user.id)

				//when we get the response we dispatch the success.
				dispatch(fetchUsersSuccess(users))
			})
			.catch(error => {
				//error.message is the error message.
				//whenit fails we fetch the error message.
				dispatch(fetchUsersFailed(error.message))
			})
	}
}

//step 5 create the store.
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

//subscribe to the store.
store.subscribe(() => {
	console.log(store.getState())
})
store.dispatch(fetchUsers())
