import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Navbar from "../navigation/Navbar";

export default function PrivateRoute({ children }) {
  const { user, token, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {location.pathname !== "/home" && <Navbar />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
