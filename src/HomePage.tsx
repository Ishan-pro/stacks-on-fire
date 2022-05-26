import { useState, useRef, useEffect } from 'react'
import Posts from './components/posts'
import { useGetallpostsQuery, Post , useCreatePostsMutation} from './features/posts'
import tw from 'tailwind-styled-components'
import {useSelector} from 'react-redux'
// import PostForm from './components/PostForm'

function Home() {
  
  const [createPost, result]= useCreatePostsMutation()
  const [postText, setPostText]= useState('')
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const { isLoading, isError, data, isSuccess } = useGetallpostsQuery(page)
  useEffect(() => {
    if (isSuccess) {
    setPosts(posts => [...posts, ...data])
  }
  }, [data])
  const LoadPages = () => {
    setPage(page => page + 1)
  }
  return (
    <>
      
      <Container style={{ height: "90vh" }}>

        <SideBar>
        </SideBar>

        <PostBox>

          <PostForm>
            <PostInput 
              placeholder="Write your heart here..." 
              value={postText}
              onChange={(e) => {setPostText(e.target.value)}}
            />
            <PostBtn
              onClick={() => {createPost(postText)}}
            >Post</PostBtn>         
          </PostForm>
          {isLoading ? 'Loading...' : 
            <>

              {posts.map(post => {
                return <Posts text={post.text} key={post.id} />
              })}
              <InfiniteLoading onMouseOver={LoadPages}>

              </InfiniteLoading>
            </>
          }
        </PostBox>

      </Container>
    </>
  )
}

const SideBar = tw.div`
  bg-cyan-500
  hidden
  lg:block
`

const PostBox = tw.div`
  col-span-4
  lg:col-span-3
  bg-slate-300
  overflow-scroll
`
const InfiniteLoading = tw.div`
  
`

const PostForm = tw.div`
  shadow-lg
  bg-white
  border-1
  my-1
  mx-1
  rounded
  px-2
  h-48
  py-2
  row-span-2
  grid
  grid-cols-2
`

const PostBtn = tw.button`
  py-2
  px-2
  bg-cyan-500
  rounded
  place-center
  hover:bg-cyan-400
  justify-self-end
  self-center
  shadow-md
`

const PostInput = tw.textarea`
  align-self-center
  border-none
  py-2
  px-2
  focus-visible:outline-none
  text-lg
  overflow-visible
`

const Container = tw.div`
  grid
  grid-cols-4
  grid-rows-1
`

export default Home
