import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'
import './styles/Login.css'

export function Login() {
  const navigate = useNavigate()
  const { login, signup, errorMessage } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginActive, setIsLoginActive] = useState(true)

  const handleLogin = () => {
    login(email, password).then(() => {
      navigate('/home')
    })
  }
  const handleSignup = async () => {
    const data = await signup(email, password)
    if (!data.error) handleLogin()
  }
  const handleActive = () => {
    setIsLoginActive(!isLoginActive)
  }
  return (
    <div className='login'>
      {isLoginActive ? (
        <div className="login-title">
          <h1 className="login-title__title">Se connecter</h1>
          <h1
            className="login-title__title active-signup-title"
            onClick={handleActive}
          >
            S'enregistrer
          </h1>
        </div>
      ) : (
        <div className="login-title">
          <h1
            className="login-title__title active-login-title"
            onClick={handleActive}
          >
            Se connecter
          </h1>
          <h1 className="login-title__title">S'enregistrer</h1>
        </div>
      )}

      <div className="login-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      {isLoginActive ? (
        <>
          <button onClick={handleLogin}>Se connecter</button>
          <button onClick={handleActive}>Pas encore inscrit ?</button>
        </>
      ) : (
        <>
          <button onClick={handleSignup}>S'enregistrer</button>
          <button onClick={handleActive}>Déjà inscrit ?</button>
        </>
      )}
      </div>
      {/* {errorMessage ? <span>{errorMessage}</span> : null} */}
    </div>
  )
}
