import { Login } from '../components/Login'
import { useTheme } from '../utils/hooks/useTheme'
import './styles/LoginPage.css'

export function LoginPage() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <div className="loginpage-logo">
        <img
          src={
            theme === 'dark'
              ? '/assets/icon-left-font-dark.svg'
              : '/assets/icon-left-font-light.svg'
          }
          className="loginpage-logo-image"
        />
      </div>
      <Login />
      <input
        type="checkbox"
        className="themeInput loginpage-theme-input"
        checked={theme === 'dark'}
        onChange={() => toggleTheme()}
      />
    </>
  )
}
