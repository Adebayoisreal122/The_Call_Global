import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Still checking the token — show a full-screen spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030a2e]">
        <div className="flex flex-col items-center gap-4">
          <img src="/logowhite.png" alt="The Call Global" className="h-16 w-16 object-contain rounded-full animate-pulse" />
          <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Not logged in — send to login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // All good — render the child admin route
  return <Outlet />;
}
