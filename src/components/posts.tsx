import React from 'react'
import tw from 'tailwind-styled-components'

export default function Posts({text}:Proptype) {
  return (
    <PostBox>{text}</PostBox>
  )
}

interface Proptype {
  text:string;
}

const PostBox = tw.div`
    border-solid
    bg-white
    border-1
    my-1
    mx-1
    rounded
    px-2
    py-2
    h-24
`