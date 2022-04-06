import {useRegisterMutation, useGetTokenMutation} from '../features/users'
import React, {useState, useEffect} from 'react'
import tw from 'tailwind-styled-components'
import {useAppSelector} from '../store/store'
import {Navigate} from 'react-router-dom'

const LoginPage =() => {
	const accessToken = useAppSelector(state => state.token.access)
	const [login, setLogin] = useState(false)


interface LoginChoiceProps {
	$login:boolean;
}


const LoginChoice = tw.button<LoginChoiceProps>`
	text-xl
	py-2
	w-full
	px-2
	${({$login})=> ($login ? 
		login ? "bg-purple-600 border-l-2 border-b-4 border-sky-500" :
		"bg-blue-500" 
		: !login ? "bg-purple-600 border-l-2 border-b-4 border-sky-500" : 
		"bg-blue-500")}
	place-center
	hover:bg-purple-600
	hover:border-l-2
	hover:border-b-4
	hover:border-sky-500
	text-white
`

	
	return (
		<>	
			{accessToken && <Navigate replace to="/"/> }
			<Container >
				
				<LoginForm style={{backgroundColor: "rgba(17, 25, 40, 0.75)"}} >
					<BtnGroup>
						<LoginChoice 
							$login={true} 
							onClick={() => {setLogin(true)}}
							type='button'
						>
							Login
						</LoginChoice>
						<LoginChoice 
							onClick={() => {setLogin(false)}}
							$login={false}
							type='button'
						>
							Register
						</LoginChoice>
					</BtnGroup>
							
				{login ? <LoginUserForm/> : <RegisterForm/>}
				</LoginForm>
			</Container>
		</>
	)
}

const LoginUserForm = () => {

	const [getToken, result] = useGetTokenMutation()
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const handleLogin = (e:React.FormEvent):void => {
		e.preventDefault()
		getToken({
			username, 
			password
		})

	}
	return (
		<RealLoginForm>
			<InputLabel>Username</InputLabel>
			<Input value={username} onChange={(e) => setUsername(e.target.value)}/>
			<InputLabel>Pick a Password</InputLabel>
			<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<SubmitBtn type="submit" onClick={handleLogin}>Register</SubmitBtn>
		
		</RealLoginForm>
	)
}

const RegisterForm = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName]= useState('')
	const [getToken, tokenresult] = useGetTokenMutation()
	const [Register, result] = useRegisterMutation()
	const handleRegister = (e:React.FormEvent):void => {
		e.preventDefault()
		Register({
			username,
			first_name,
			last_name,
			email,
			password
		})
		if (result.data) {
			getToken({
				username,
				password
			})
		}
	}
	return (
		<RealRegisterForm>
					<InputLabel>Username</InputLabel>
				<Input value={username} onChange={(e) => setUsername(e.target.value)}/>

				<InputLabel>First Name</InputLabel>
				<Input value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
				<InputLabel>Last Name</InputLabel>
				<Input value={last_name} onChange={(e) => setLastName(e.target.value)}/>
				<InputLabel>Email</InputLabel>
				<Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				<InputLabel>Pick a Password</InputLabel>
				<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<SubmitBtn type="submit" onClick={handleRegister}>Register</SubmitBtn>
		</RealRegisterForm>
)
}

const RealRegisterForm = tw.div`
	grid
	text-white
	row-span-6
	lg:grid-cols-4
	grid-cols-2
	gap-4
`

const RealLoginForm = tw.div`
	grid
	text-white
	row-span-6
	lg:grid-cols-2
	grid-cols-1
	grid-rows-3
	gap-4
`

const LoginForm = tw.form`
	grid
	text-white
	backdrop-blur-md
	opacity-80
	m-8
	grid-rows-7
	rounded
	py-2
	px-2
	gap-4
`

const BtnGroup = tw.div`
	grid
	grid-cols-2
	place-items-center
	w-full
`

const InputLabel = tw.div`
	text-xl

`
const H1 = tw.h2`
	text-2xl

`

const SubmitBtn = tw.button`
	py-2
	px-2
	bg-cyan-500
	rounded
	place-center
	hover:bg-cyan-600
	hover:border-l-2
	hover:border-b-4
	hover:border-sky-500
	col-span-2
`

const Input = tw.input`
	bg-white
	rounded
	text-black
	h-12
	px-2
`

const Container =tw.div`
	bg-gradient-to-r
	from-purple-500
	to-pink-500
	h-screen
	flex
	justify-center
	items-center
	flex-col
`


export default LoginPage