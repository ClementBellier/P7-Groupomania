import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const RequireAuth = ({ children }) => {
  const { authed } = useAuth()

  return authed === true ? children : <Navigate to="/" replace />
}
