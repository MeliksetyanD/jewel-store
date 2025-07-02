import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkAuth } from '../features/auth'

const initialState = {
	entities: [],
	blogs: [],

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
export const getBlogsAdmin = createAsyncThunk('admin/getBlogs', async () => {
	const response = await fetch('http://localhost:4700/blog')

	const data = await response.json()

	return data
})

export const getBlogByIdAdmin = createAsyncThunk(
	'admin/getBlogByIdAdmin',
	async id => {
		const response = await fetch(`http://localhost:4700/blog/${id}`)
		const data = await response.json()

		return data
	}
)
export const deleteBlogAdmin = createAsyncThunk(
	'admin/deleteBlogAdmin',
	async id => {
		const response = await fetch(`http://localhost:4700/blog/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: await checkAuth(),
			},
		})
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
			headers: {
				authorization: await checkAuth(),
			},
		})
		const data = await response.json()

		return data
	}
)
export const updateBlogAdmin = createAsyncThunk(
	'admin/updateBlogAdmin',
	async data => {
		const response = await fetch(
			`http://localhost:4700/blog/put/${data.id}`,
			{
				body: JSON.stringify(data),
			}
		)
		const dataRes = await response.json()

		return dataRes[0]
	}
)
export const createBlogAdmin = createAsyncThunk(
	'admin/createBlogAdmin',
	async data => {
		const response = await fetch(`http://localhost:4700/blog/post`, {
			method: 'POST',

			body: data,
		})
		const dataRes = await response.json()

		console.log({ ...dataRes, images: [...data.images] })
		return dataRes[0]
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
			.addCase(getBlogByIdAdmin.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getBlogByIdAdmin.fulfilled, (state, action) => {
				state.single = action.payload
				state.loading = 'success'
			})
			.addCase(getBlogByIdAdmin.rejected, state => {
				state.loading = 'failed'
			})
			.addCase(deleteBlogAdmin.pending, state => {
				state.loading = 'pending'
			})
			.addCase(deleteBlogAdmin.fulfilled, (state, action) => {
				state.entities = state.blogs.filter(item => item.uid !== action.payload)
				state.loading = 'success'
			})
			.addCase(deleteBlogAdmin.rejected, state => {
				state.loading = 'failed'
			})
			.addCase(getBlogsAdmin.pending, state => {
				state.loading = 'pending'
			})
			.addCase(getBlogsAdmin.fulfilled, (state, action) => {
				state.blogs = action.payload
				state.loading = 'success'
			})
			.addCase(getBlogsAdmin.rejected, state => {
				state.loading = 'failed'
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
