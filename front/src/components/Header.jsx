import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'
import { useTheme } from '../utils/hooks/useTheme'
import './styles/Header.css'
import { HEADER as TEXT } from '../../public/assets/texts/texts'

export function Header() {
  const { logout, userDetails } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation().pathname

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const LinkToHome = ({ children }) => {
    if (location === '/home')
      return (
        <div
          role="link"
          aria-label={TEXT.SCROLL_TO_TOP}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="header__logo"
        >
          {children}
        </div>
      )
    return (
      <Link to="/home" className="header__logo">
        {children}
      </Link>
    )
  }

  return (
    <header className="header">
      <h1>
        <LinkToHome>
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
        </LinkToHome>
      </h1>
      <div className="header__actions">
        <NavLink
          to={`/profile/${userDetails.userId}`}
          className={({ isActive }) =>
            isActive
              ? 'header__actions--active header__action--link'
              : 'header__action--link'
          }
          aria-label={TEXT.PROFILE}
        >
          <svg viewBox="0 0 24 24">
            <use href="#profile" />
          </svg>
          <p className="header__action--text">{TEXT.PROFILE}</p>
        </NavLink>
        <div onClick={handleLogout} aria-label={TEXT.LOGOUT} role="button" className='header__action--link' >
          <svg viewBox="0 0 24 24">
            <use href="#logout" />
          </svg>
          <p className="header__action--text logout">{TEXT.LOGOUT}</p>
        </div>
      </div>
    </header>
  )
}
