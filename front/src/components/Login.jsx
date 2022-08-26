import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'
import './styles/Login.css'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'

export function Login() {
  const navigate = useNavigate()
  const { login, signup, errorMessage, setErrorMessage } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAnErrorInMail, setIsAnErrorInMail] = useState(true)
  const [isAnErrorInPassword, setIsAnErrorInPassword] = useState(true)
  const [isLoginActive, setIsLoginActive] = useState(true)

  const handleLogin = (event) => {
    if (event) event.preventDefault()
    login(email, password).then(() => {
      navigate('/home')
    })
  }
  const handleSignup = async (e) => {
    e.preventDefault()
    const data = await signup(email, password)
    if (!data.error) handleLogin()
  }
  const handleIsLoginActive = (e) => {
    e.preventDefault()
    setErrorMessage()
    setIsLoginActive(!isLoginActive)
  }
  return (
    <div className="login">
      <div className="login-title">
        <h2
          className={
            isLoginActive
              ? 'login-title__title'
              : 'login-title__title inactive-login-title'
          }
          onClick={!isLoginActive && handleIsLoginActive}
        >
          Se connecter
        </h2>
        <h2
          className={
            isLoginActive
              ? 'login-title__title inactive-signup-title'
              : 'login-title__title'
          }
          onClick={isLoginActive && handleIsLoginActive}
        >
          S'enregistrer
        </h2>
      </div>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <EmailInput
          email={email}
          setEmail={setEmail}
          isLoginActive={isLoginActive}
          isAnErrorInMail={isAnErrorInMail}
          setIsAnErrorInMail={setIsAnErrorInMail}
          setErrorMessage={setErrorMessage}
        />
        {typeof errorMessage === 'string' && (
          <span className="error-message">{errorMessage}</span>
        )}
        <label htmlFor="password">Mot de passe</label>
        <PasswordInput
          password={password}
          setPassword={setPassword}
          isLoginActive={isLoginActive}
          isAnErrorInPassword={isAnErrorInPassword}
          setIsAnErrorInPassword={setIsAnErrorInPassword}
        />
        {typeof errorMessage === 'object' &&
          errorMessage.map((error) => (
            <span className="error-message">{error.message}</span>
          ))}
        <button
          type="submit"
          className="accent"
          onClick={(e) =>
            isLoginActive
              ? handleLogin(e)
              : !isAnErrorInMail && !isAnErrorInPassword && handleSignup(e)
          }
        >
          {isLoginActive ? 'Se connecter' : "S'enregistrer"}
        </button>
        <button onClick={(e) => handleIsLoginActive(e)}>
          {isLoginActive ? "Pas encore inscrit ?" : "Déjà inscrit ?"}
        </button>
      </form>
    </div>
  )
}
