import {createSlice, PayloadAction} from "@reduxjs/toolkit/"
import {TokenPair} from "./users"

const initialState:TokenPair = {
	refresh:"",
	access:"",
} 

const tokenSlice = createSlice({
	name:"token",
	initialState,
	reducers:{
		addFromLocalStorage(state) {
			let accessToken = localStorage.getItem('accessToken')
			let refreshToken = localStorage.getItem('refreshToken')
			accessToken ? state.access = accessToken : state.access = ""
			refreshToken ? state.refresh = refreshToken : state.access = ""
		},
		addRefreshToken(state, action) {
			localStorage.setItem('refreshToken', action.payload)
			state.refresh = action.payload
		},
		addAccessToken(state, action) {
			localStorage.setItem('accessToken', action.payload)
			state.access = action.payload
		},
		removeTokens(state) {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
			state.access = ''
			state.refresh = ''
		}
	}	
})

export const {addFromLocalStorage, addRefreshToken, addAccessToken, removeTokens}  = tokenSlice.actions

export default tokenSlice.reducer