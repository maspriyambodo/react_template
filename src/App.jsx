import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'
import Login from './pages/Login'
import useAuthStore from './store/useAuthStore'

// Lazy load pages for code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Users = lazy(() => import('./pages/Users'))
// Analytics loads heavy chart libraries, so lazy load it more aggressively
const Analytics = lazy(() => import('./pages/Analytics'))
// DataGrid loads heavy grid libraries, so lazy load it more aggressively
const DataGrid = lazy(() => import('./pages/DataGrid'))
const Settings = lazy(() => import('./pages/Settings'))

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
)

// Title updater component
const TitleUpdater = () => {
  const location = useLocation()
  
  useEffect(() => {
    const titles = {
      '/': 'Dashboard',
      '/users': 'Users Management',
      '/analytics': 'Analytics',
      '/data-grid': 'Data Grid',
      '/settings': 'Settings',
      '/login': 'Login',
    }
    
    const title = titles[location.pathname] || 'Admin Dashboard'
    document.title = `${title} | Admin Dashboard`
  }, [location.pathname])
  
  return null
}

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <TitleUpdater />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public route */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login />
              }
            />

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/data-grid" element={<DataGrid />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Catch all - redirect to home or login */}
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? '/' : '/login'} replace />
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
