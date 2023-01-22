const { createStore } = require('redux')
const { produce } = require('immer')
// import { produce } from 'immer'

//create the intial state,
const initialState = {
	name: 'Arnold',
	address: {
		street: '123 Main St.',
		city: 'Boston',
		state: 'MA',
	},
}

//we want to update the street name of the user.
//step1. define the action type.
const STREET_UPDATED = 'STREET_UPDATED'

//step 2. create the actionCreator.
const updateStreet = street => {
	return {
		type: STREET_UPDATED,
		payload: street,
	}
}

//step 3. define thereducer to handle this action.
const streetReducer = (state = initialState, action) => {
	switch (action.type) {
		case STREET_UPDATED:
			// return {
			// 	...state,
			// 	address: {
			// 		...state.address,
			// 		street: action.payload,
			// 	},
			// }

			//helps the developer update the specific item
			return produce(state, draft => {
				draft.address.street = action.payload
			})
		default: {
			return state
		}
	}
}

//step 4. create the store.
const store = createStore(streetReducer)

//step 5log the inital value in the store.
console.log('Initial Value of Street', store.getState())

//step 6 subscribe and unsubscribe to the data.
const unsubscribe = store.subscribe(() => {
	console.log('Updated State', store.getState())
})

//step 7 dispatch the data.
store.dispatch(updateStreet('456 Main st.'))
store.dispatch(updateStreet('789 Main st.'))

//unsubscribe.
unsubscribe()
