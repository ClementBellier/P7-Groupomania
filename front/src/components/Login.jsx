import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../utils/hooks/useAuth'

export function Login() {
  const navigate = useNavigate()
  const { login, signup, errorMessage } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    login(email, password).then(() => {
      navigate('/home')
    })
  }
  const handleSignup = async () => {
    const data = await signup(email, password)
    if(!data.error) handleLogin()
  }
  return (
    <>
      <h1>Login</h1>
      <div>
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
      </div>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleSignup}>Sign Up</button>
      {errorMessage ? (<span>{errorMessage}</span>) : null}
    </>
  )
}
