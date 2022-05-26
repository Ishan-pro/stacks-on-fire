import tw from 'tailwind-styled-components'
import {Navigate} from 'react-router-dom'
import {useAppSelector, useAppDispatch} from '../store/store'
import {removeTokens} from '../features/tokens'

const Dashboard = () => {
	const dispatch = useAppDispatch()
	const logout = () => {
		dispatch(removeTokens())
	}
	const accessToken = useAppSelector(store => store.token.access)
	return (
		<>
			{/*{accessToken == '' && <Navigate replace to="/"/> }*/}
			<LogoutBtn onClick={logout}>Logout</LogoutBtn>
			
		</>
	)
}


const LogoutBtn = tw.button`
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




export default Dashboard