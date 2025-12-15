import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'; // <--- New Imports
import './App.css'
import { useAuth } from './context/AuthContext'
import Login from './pages/auth'
import Dashboard from './pages/dashboard'
import Orders from './pages/orders'
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Student from './pages/student';
function App() {
 const { isLoggedIn } = useAuth();
  
  return (
    <>
      <Routes> {/* <--- Use Routes container */}
        
        {/* Public Route: Login Page */}
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        
        {/* Protected Routes: Wrap components in <ProtectedRoute> */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/students" 
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Route: Redirects users to the appropriate starting point */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
        
      </Routes>
    </>
  )
}

export default App
