import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { RequireAuth } from './utils/context/RequireAuth'
import { AuthProvider } from './utils/hooks/useAuth'
import { Header } from './components/Header'
import { Error404 } from './pages/Error404'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Header />
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <RequireAuth>
              <Header />
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Error404 />
            </>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
