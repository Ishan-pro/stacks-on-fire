import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {addRefreshToken, addAccessToken} from './tokens'

interface UserInput {
	username:string;
	first_name:string;
	last_name:string;
	email:string;
	password:string;
}

interface UserOutput {
	username:string;
	first_name:string;
	last_name:string;
	email:string;
	id:number;
}

interface LoginUser {
	username:string;
	password:string;
}

export interface TokenPair {
	refresh:string;
	access:string;
}

interface RefreshToken {
	refresh:string;
}

interface AccessToken {
	access:string;
}

export const usersApi = createApi({
	reducerPath:"users",
	baseQuery:fetchBaseQuery({baseUrl:"http://127.0.0.1:8000/api/"}),
	endpoints:(builder) => ({
		register:builder.mutation<UserOutput, UserInput>({
			query:(user) => ({
				url:"user/",
				method:"POST",
				body:user
			})
		}),
		getToken:builder.mutation<TokenPair, LoginUser>({
			query:(userlogin) => ({
				url:"token/",
				method:"post",
				body:userlogin
			}),
			async onCacheEntryAdded(arg, {getState, dispatch, cacheDataLoaded, getCacheEntry}) {
				const {data} = await cacheDataLoaded
				if (data) {
					dispatch(addAccessToken(data.access))
					dispatch(addRefreshToken(data.refresh))
				}
			}
		}),
		refreshToken:builder.mutation<AccessToken, RefreshToken>({
			query:(refresh) => ({
				url:"token/refresh/",
				method:"POST",
				body:refresh
			}),
			async onCacheEntryAdded(arg, {getState, dispatch, cacheDataLoaded, getCacheEntry}) {
				const {data} = await cacheDataLoaded
				if (data) {
					dispatch(addAccessToken(data.access))
				}
			}
		})
	})
})

export const {useRegisterMutation, useGetTokenMutation, useRefreshTokenMutation} = usersApi