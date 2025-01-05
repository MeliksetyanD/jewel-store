import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getSale = createAsyncThunk('sale/getSale', async () => {
	const response = await fetch('http://localhost:4700/products')
	const data = await response.json()

	return data.filter(product => product.forSlide === true)
})

const initialState = {
	entities: [],
	loading: 'true',
}

export const saleReducer = createSlice({
	name: 'sale',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getSale.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getSale.fulfilled, (state, action) => {
				state.entities = action.payload

				state.loading = 'success'
			})
			.addCase(getSale.rejected, state => {
				state.loading = 'failed'
			})
	},
})

export default saleReducer.reducer
