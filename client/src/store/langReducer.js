import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	AM: 'AM',
}
export const langReducer = createSlice({
	name: 'languages',
	initialState,
	reducers: {
		setLanguage: (state, action) => {
			state.language = action.payload
		},
	},
})
export const { setLanguage } = langReducer.actions
export default langReducer.reducer
