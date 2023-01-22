const { createStore } = require('redux')

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
				...state,
				loading: true,
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

//step 5 create the store.
const store = createStore(reducer)
