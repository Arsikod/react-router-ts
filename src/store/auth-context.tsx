import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext<
  | {
      isLoggedIn: boolean;
      logIn: () => void;
      logOut: () => void;
    }
  | undefined
>(undefined);

export function useAuthStore() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthStore must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    setLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
