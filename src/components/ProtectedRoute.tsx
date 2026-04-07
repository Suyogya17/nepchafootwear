// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}