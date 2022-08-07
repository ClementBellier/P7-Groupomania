import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { RequireAuth } from './utils/context/RequireAuth'
import { AuthProvider } from './utils/hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/profile/:id" element={<RequireAuth><Profile /></RequireAuth>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
