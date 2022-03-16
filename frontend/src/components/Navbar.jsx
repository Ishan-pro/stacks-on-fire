import React from 'react'
import tw from 'tailwind-styled-components'

export default function Navbar() {
  return (
    <Nav>
        <span>Hamburger</span>
        <Navheading>Stacks on Fire</Navheading>
        <span>Account Icon</span>
    </Nav>
  )
}

const Nav= tw.nav`
    bg-orange-400
    grid
    grid-cols-3

`