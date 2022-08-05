import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Home } from './pages/Home'
import { RequireAuth } from './utils/context/RequireAuth'
import { AuthProvider } from './utils/hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
