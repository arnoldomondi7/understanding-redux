import { createStore } from 'redux'

// create actions
//WE USE CONSTANTS TO AVOID SPELLING MISTAKES.
const CAKE_ORDERED = 'CAKE_ORDERED'
//action type to restock the cakes.
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

//create action creator
//CREATE THE ACTION OBJECT.
const orderCake = () => {
	return {
		type: CAKE_ORDERED,
		payload: 1,
	}
}

//create an action creator that will handle the cakerestocked
const cakeRestocked = (qty = 1) => {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	}
}

//create the reducers.
//first create the initial state (inside an object)
const initialState = {
	numberOfCakes: 10,
}

//create the reducer function.
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				// copy the initial state
				// change only the item that needs to be changed
				...state,
				numberOfCakes: state.numberOfCakes - 1,
			}

		case CAKE_RESTOCKED:
			return {
				...state,
				//use action.quantity so that it updates based on the number that was orderd
				//to ensure that the number of cakes will always be === initial value.
				numberOfCakes: state.numberOfCakes + action.payload,
			}
		default:
			return state
	}
}

//create the store.
//it holds the application state as shown below.
const store = createStore(reducer)
//using the getState() you can access the state of the application.
console.log('initial state', store.getState())

//subscribe method.
//it accepts a function.
const unsubscribe = store.subscribe(() =>
	console.log('Update State', store.getState())
)

//dispatch, allows the state to be updated.
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

//restocking the number of cakes in the store.
store.dispatch(cakeRestocked(3))

//once the code has finnished call the unsubscribe method.
unsubscribe()
