import { configureStore } from '@reduxjs/toolkit'

import { default as adminReducer } from './adminSlice'
import { default as cartReducer } from './cartSlice'
import { default as langReducer } from './langReducer'
import { default as productsReducer } from './productsSlice'
import { default as saleReducer } from './saleSlice'
const reducer = {
	products: productsReducer,
	cart: cartReducer,
	sale: saleReducer,
	admin: adminReducer,
	languages: langReducer,
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
	sale: {
		entities: [],
		loading: 'true',
	},
	admin: {
		entities: [],
		blogs: [],

		loading: 'true',
	},
	languages: {
		main: 'AM',
	},
}
export const store = configureStore({
	reducer,
	preloadedState,
})
