"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthContextType {
  auth: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ لحالة الانتظار
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setAuth(!!token); // true if token exists
    setLoading(false); // ✅ خلاص اتحققت من التوكن
  }, []);

  const login = () => {
    Cookies.set("token", "mock_token", { expires: 7 });
    setAuth(true);
    router.push("/dashboard");
  };

  const logout = () => {
    Cookies.remove("token");
    setAuth(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
