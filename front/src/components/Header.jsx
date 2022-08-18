import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'
import { useTheme } from '../utils/hooks/useTheme'
import './styles/Header.css'

export function Header() {
  const { logout, userDetails } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <Link to="/home" className="header__logo">
        <img
          src={
            theme === 'dark'
              ? '/assets/icon-left-font-monochrome-black.svg'
              : '/assets/icon-left-font-monochrome-white.svg'
          }
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
        <input
          type="checkbox"
          className="themeInput"
          checked={theme === 'dark'}
          onChange={() => toggleTheme()}
        />
      </div>
    </header>
  )
}
