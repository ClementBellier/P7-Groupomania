import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'
import { useTheme } from '../utils/hooks/useTheme'
import './styles/Header.css'
import { THEME, HEADER as TEXT } from '../../public/assets/texts/texts'

export function Header() {
  const { logout, userDetails } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <h1>
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
          <div className="header__logo--text">social network</div>
        </Link>
      </h1>
      <div className="header__actions">
        <NavLink
          to={`/profile/${userDetails.userId}`}
          className={({ isActive }) =>
            isActive ? 'header__actions--active' : undefined
          }
          aria-label={TEXT.PROFILE}
        >
          <svg viewBox="0 0 24 24">
            <use href="#profile" />
          </svg>
        </NavLink>
        <div onClick={handleLogout} aria-label={TEXT.LOGOUT} role="button">
          <svg viewBox="0 0 24 24">
            <use href="#logout" />
          </svg>
        </div>
        <input
          type="checkbox"
          className="themeInput"
          checked={theme === 'dark'}
          onChange={() => toggleTheme()}
          aria-label={THEME.ARIA_LABEL}
        />
      </div>
    </header>
  )
}
