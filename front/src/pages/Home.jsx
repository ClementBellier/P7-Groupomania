import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'

export function Home(){
    const { logout, userDetails } = useAuth()
    const navigate = useNavigate()
    console.log(userDetails)
    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
    <>
    <h1>Home</h1>
    <button onClick={handleLogout}>Logout</button>
    </>)
}