import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "../store/auth-context";

export function ProtectedRoute() {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
