import { Routes, Route } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { RequireAuth, ThemeProvider } from './utils/context'
import { AuthProvider } from './utils/hooks/useAuth'
import { Header } from './components/Header'
import { Error404 } from './pages/Error404'
import { GlobalStyle } from './utils/Atoms/GlobalStyles'
import { Footer } from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Header />
                <Home />
                <Footer />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <RequireAuth>
                <Header />
                <Profile />
                <Footer />
              </RequireAuth>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header />
                <Error404 />
                <Footer />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
