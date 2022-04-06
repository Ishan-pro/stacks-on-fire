import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../features/posts";
import {usersApi} from '../features/users';
import tokenReducer from '../features/tokens'
import {useSelector, useDispatch, TypedUseSelectorHook} from 'react-redux'

const store = configureStore({
    reducer:{
        [postsApi.reducerPath]:postsApi.reducer,
        [usersApi.reducerPath]:usersApi.reducer,
        token:tokenReducer
    },
    middleware:getDefaultMiddleware =>
    getDefaultMiddleware().concat(postsApi.middleware).concat(usersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = () =>  useDispatch<AppDispatch>()

export type AppDispatch = typeof store.dispatch

export default store