import { configureStore } from '@reduxjs/toolkit'

import { default as cartReducer } from './cartSlice'
import { default as productsReducer } from './productsSlice'
const reducer = {
	products: productsReducer,
	cart: cartReducer,
}

const preloadedState = {
	products: {
		entities: [],
		singleProduct: [],
		loading: 'true',
	},
	cart: {
		entities: [],

		loading: 'true',
	},
}
export const store = configureStore({
	reducer,
	preloadedState,
})
