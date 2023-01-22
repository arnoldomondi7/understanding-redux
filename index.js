const redux = require('redux')
const { combineReducers, createStore, applyMiddleware } = redux
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

// create actions
//WE USE CONSTANTS TO AVOID SPELLING MISTAKES.
const CAKE_ORDERED = 'CAKE_ORDERED'

//action type to restock the cakes.
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

//action type to create icecream ordered.
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'

//action type to restok the images.
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'

//create action creator
//CREATE THE ACTION OBJECT.
const orderCake = (qty = 1) => {
	return {
		type: CAKE_ORDERED,
		payload: qty,
	}
}

//create an action creator that will handle the cakerestocked
const cakeRestocked = (qty = 1) => {
	return {
		type: CAKE_RESTOCKED,
		payload: qty,
	}
}

//create action creator to make an order of the icecream.
const orderIcecream = (qty = 1) => {
	return {
		type: ICE_CREAM_ORDERED,
		payload: qty,
	}
}

//create an action creator to restock the icecream.
const restockIcecream = (qty = 1) => {
	return {
		type: ICE_CREAM_RESTOCKED,
		payload: qty,
	}
}
//create the reducers.
//first create the initial state (inside an object)

const initialCakeState = {
	numberOfCakes: 10,
}

const initialIcecreamState = {
	numberOfIcecreams: 20,
}

//create the reducer function.
const cakeReducer = (state = initialCakeState, action) => {
	switch (action.type) {
		case CAKE_ORDERED:
			return {
				// copy the initial state
				// change only the item that needs to be changed
				...state,
				numberOfCakes: state.numberOfCakes - action.payload,
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

//create the reducer function.
const iceCreamReducer = (state = initialIcecreamState, action) => {
	switch (action.type) {
		case ICE_CREAM_ORDERED:
			return {
				// copy the initial state
				// change only the item that needs to be changed
				...state,
				numberOfIcecreams: state.numberOfIcecreams - action.payload,
			}

		case ICE_CREAM_RESTOCKED:
			return {
				...state,
				//use action.quantity so that it updates based on the number that was orderd
				//to ensure that the number of cakes will always be === initial value.
				numberOfIcecreams: state.numberOfIcecreams + action.payload,
			}
		default:
			return state
	}
}

//combine all the reducers.
const rootReducer = combineReducers({
	cakes: cakeReducer,
	icecream: iceCreamReducer,
})

//create the store.
//it holds the application state as shown below.

const store = createStore(rootReducer, applyMiddleware(logger))
//using the getState() you can access the state of the application.
console.log('initial state', store.getState())

//subscribe method.
//it accepts a function.
const unsubscribe = store.subscribe(() => {})

//dispatch, allows the state to be updated.
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

//restocking the number of cakes in the store.
store.dispatch(cakeRestocked(3))

//for the icecream.
store.dispatch(orderIcecream())
store.dispatch(orderIcecream())

//restocked the number of cakes in the store.
store.dispatch(restockIcecream(2))

//once the code has finnished call the unsubscribe method.
unsubscribe()
