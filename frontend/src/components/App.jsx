import { useState } from 'react'

import '../css/index.css'
import Navbar from './Navbar'

const NavBar= tw.nav`
    bg-orange-400
    grid
    grid-cols-3

`

function App() {

  return (
    <>
    <NavBar>
        <span>Hamburger</span>
        <Navheading>Stacks on Fire</Navheading>
        <span>Account Icon</span>
    </NavBar>
    </>
  )
}

export default App
