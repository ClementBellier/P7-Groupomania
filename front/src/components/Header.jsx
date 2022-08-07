import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'
import './styles/Header.css'

export function Header() {
  const { logout, userDetails } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <Link to="/home" className='header__logo'>
        <img
          src="/assets/icon-left-font-monochrome-white.svg"
          alt="Groupomania"
          className='header__logo--image'
        />
        <p className='header__logo--text'>social network</p>
      </Link>
      <div className="header__actions">
        <Link to={`/profile/${userDetails.userId}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 19v-1.25c0-2.071-1.919-3.75-4.286-3.75h-3.428C7.919 14 6 15.679 6 17.75V19m9-11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
        <div onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"
            />
          </svg>
        </div>
      </div>
    </header>
  )
}
