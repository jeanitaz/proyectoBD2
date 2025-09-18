import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "../context/useAuth";

interface ProtectedRouteProps {
  children: ReactElement;
  roles?: number[]; 
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log("Usuario actual:", user); 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.rolId)) {
    return <Navigate to="/" replace />;
  }

  return children;
};