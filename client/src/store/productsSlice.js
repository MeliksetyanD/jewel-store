import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async () => {
		const response = await fetch('http://localhost:4700/products')
		const data = await response.json()
		return data
	}
)

export const getProductById = createAsyncThunk(
	'products/getProductById',
	async id => {
		const response = await fetch(`http://localhost:4700/products/${id}`)
		const data = await response.json()

		return data
	}
)
const initialState = {
	entities: [],
	singleProduct: [],
	loading: 'false',
}

export const productsReducer = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getProducts.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.entities = action.payload
				state.loading = 'success'
			})
			.addCase(getProducts.rejected, state => {
				state.loading = 'failed'
			})
			.addCase(getProductById.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.singleProduct = action.payload
				state.loading = 'success'
			})
			.addCase(getProductById.rejected, state => {
				state.loading = 'failed'
			})
	},
})

export default productsReducer.reducer
