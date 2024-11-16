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
			if (state.entities.some(item => item.uid === action.payload.uid)) return
			state.entities.push(action.payload)
		},
		cleanCart: state => (state = initialState),
	},
})
export const { deleteFromCart, addToCart, cleanCart } = cartReducer.actions
export default cartReducer.reducer
