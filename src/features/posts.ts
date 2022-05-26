import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from '../store/store'

export interface Post {
    id:number;
    text:string,
}

interface Paginated_Response {
    count:number;
    next:string|boolean;
    previous:boolean|string;
    results:Post[]
}

export const postsApi = createApi({
    reducerPath:"posts",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://127.0.0.1:8000/api/posts/",
        prepareHeaders:async (headers, {getState}) => {
            const store = getState() as RootState
            const token = store.token.access
            if (token) {
                headers.set('authorization', `Bearer ${token}`)   
            }
            return headers
        }
    }),
    endpoints:(builder) => ({
        getallposts:builder.query<Post[], number|void>({
            query:(page) => `?page=${page}`,
            transformResponse:(responseData:Paginated_Response):Post[] => responseData.results
        }),
        createPosts:builder.mutation<Post, string|void>({
            query:(content) => ({
                url:"",
                method:"POST",
                body:{text:content}
            })
        })
    })
})

export const {useGetallpostsQuery, useCreatePostsMutation} = postsApi