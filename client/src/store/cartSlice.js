import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	entities: [],
	loading: 'true',
}

export const cartReducer = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		deleteFromCart: (state, action) => {
			state.entities = state.entities.filter(
				item => item.uid !== action.payload
			)
		},
		addToCart: (state, action) => {
			state.entities.push(action.payload)
		},
	},
})
export const { deleteFromCart, addToCart } = cartReducer.actions
export default cartReducer.reducer
