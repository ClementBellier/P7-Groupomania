import { Login } from '../components/Login'
import { useTheme } from '../utils/hooks/useTheme'
import './styles/LoginPage.css'
import { Footer } from '../components/Footer'

export function LoginPage() {
  const { theme } = useTheme()
  return (
    <>
      <header>
        <h1 className="loginpage-logo">
          <img
            src={
              theme === 'dark'
                ? '/assets/icon-left-font-dark.svg'
                : '/assets/icon-left-font-light.svg'
            }
            className="loginpage-logo-image"
            alt="Groupomania Social Network"
          />
        </h1>
      </header>
      <Login />
      <Footer />
    </>
  )
}
