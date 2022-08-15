import { Link, NavLink, useNavigate } from 'react-router-dom'
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
      <Link to="/home" className="header__logo">
        <img
          src="/assets/icon-left-font-monochrome-white.svg"
          alt="Groupomania"
          className="header__logo--image"
        />
        <p className="header__logo--text">social network</p>
      </Link>
      <div className="header__actions">
        <NavLink
          to={`/profile/${userDetails.userId}`}
          className={({ isActive }) =>
            isActive ? 'header__actions--active' : undefined
          }
        >
          <svg viewBox="0 0 24 24">
            <use href="#profile" />
          </svg>
        </NavLink>
        <div onClick={handleLogout}>
          <svg viewBox="0 0 24 24">
            <use href="#logout" />
          </svg>
        </div>
      </div>
    </header>
  )
}
