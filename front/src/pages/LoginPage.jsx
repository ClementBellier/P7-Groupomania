import { Login } from '../components/Login'
import { useTheme } from '../utils/hooks/useTheme'
import './styles/LoginPage.css'
import { THEME } from '../../public/assets/texts/texts'

export function LoginPage() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <h1 className="loginpage-logo">
        <img
          src={
            theme === 'dark'
              ? '/assets/icon-left-font-dark.svg'
              : '/assets/icon-left-font-light.svg'
          }
          className="loginpage-logo-image"
          alt='Groupomania Social Network'
        />
      </h1>
      <Login />
      <input
        type="checkbox"
        className="themeInput loginpage-theme-input"
        checked={theme === 'dark'}
        onChange={() => toggleTheme()}
        aria-label={THEME.ARIA_LABEL}
      />
    </>
  )
}
