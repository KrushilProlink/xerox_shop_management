import { Navigate, Route, Routes } from "react-router-dom"; // <--- New Imports
import "./App.css";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import Student from "./pages/student";
import { Header } from "./components/layout/header";
import Footer from "./components/layout/footer";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
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

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
