import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Navigate to="/signin" replace />;
  return children;
}

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { isAdmin, session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Navigate to="/signin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
