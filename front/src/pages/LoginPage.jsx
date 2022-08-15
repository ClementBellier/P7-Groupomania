import { Login } from '../components/Login'
import './styles/LoginPage.css'

export function LoginPage() {
  return (
    <>
      <div className="loginpage-logo">
        <img
          src="/assets/icon-left-font.svg"
          className="loginpage-logo-image"
        />
      </div>
      <Login />
    </>
  )
}
