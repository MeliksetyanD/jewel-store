import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	entities: [],
	single: [],
	loading: 'true',
}

export const getProductsAdmin = createAsyncThunk(
	'admin/getProducts',
	async () => {
		const response = await fetch('http://localhost:4700/products')
		const data = await response.json()
		return data
	}
)

export const getProductByIdAdmin = createAsyncThunk(
	'admin/getProductByIdAdmin',
	async id => {
		const response = await fetch(`http://localhost:4700/products/get/${id}`)
		const data = await response.json()

		return data
	}
)
export const deleteProductAdmin = createAsyncThunk(
	'admin/deleteProductAdmin',
	async id => {
		const response = await fetch(`http://localhost:4700/products/${id}`, {
			method: 'DELETE',
		})
		const data = await response.json()

		return data
	}
)
export const updateProductAdmin = createAsyncThunk(
	'admin/updateProductAdmin',
	async data => {
		const response = await fetch(
			`http://localhost:4700/products/put/${data.id}`,
			{
				body: JSON.stringify(data),
			}
		)
		const dataRes = await response.json()

		return dataRes[0]
	}
)
export const createProductAdmin = createAsyncThunk(
	'admin/createProductAdmin',
	async data => {
		const response = await fetch(`http://localhost:4700/products/post`, {
			method: 'POST',

			body: data,
		})
		const dataRes = await response.json()

		console.log({ ...dataRes, images: [...data.images] })
		return dataRes[0]
	}
)
export const adminReducer = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		clearSingle: state => {
			state.single = []
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getProductsAdmin.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getProductsAdmin.fulfilled, (state, action) => {
				state.entities = action.payload
				state.loading = 'success'
			})
			.addCase(getProductsAdmin.rejected, state => {
				state.loading = 'failed'
			})
			.addCase(getProductByIdAdmin.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getProductByIdAdmin.fulfilled, (state, action) => {
				state.single = action.payload
				state.loading = 'success'
			})
			.addCase(getProductByIdAdmin.rejected, state => {
				state.loading = 'failed'
			})
			.addCase(deleteProductAdmin.pending, state => {
				state.loading = 'pending'
			})
			.addCase(deleteProductAdmin.fulfilled, (state, action) => {
				state.entities = state.entities.filter(
					item => item.uid !== action.payload
				)
				state.loading = 'success'
			})
			.addCase(deleteProductAdmin.rejected, state => {
				state.loading = 'failed'
			})
	},
})
export const { clearSingle } = adminReducer.actions
export default adminReducer.reducer
