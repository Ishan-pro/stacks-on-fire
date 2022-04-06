import Home from './HomePage'
import LoginPage from './components/loginpage'
import {Route, Routes} from 'react-router-dom'
import tw from 'tailwind-styled-components'
import React, {useEffect} from 'react'

import {useAppSelector } from './store/store'
import './App.css'
import Dashboard from './components/dashboard'

export default function App() {


  const accessToken = useAppSelector(state => state.token.access)
  const refreshToken = useAppSelector(state => state.token.refresh)
	return (
		<>
		<NavBar style={{height:"10vh"}}>
        <h1 className="text-2xl flex-1">Stacks on Fire</h1>
        {accessToken ? <a href="/dashboard/">Dashboard</a>: <a href="/login/">Login</a>}
      </NavBar>
			<Routes>

				<Route path="/" element={<Home/>}/>
				<Route path="/login/" element={<LoginPage/>}/>
				
				{<Route path="/dashboard" element={<Dashboard/>}/>}
				{/*<Route path="/about" component={About}/>*/}
			</Routes>
		</>
	)
}


const NavBar = tw.nav`
  w-full
  py-2
  opacity-80
  text-white
  px-2
  top-0
  bg-red-500
  flex
`

const Navlink = tw.div`
	hover:bold

`