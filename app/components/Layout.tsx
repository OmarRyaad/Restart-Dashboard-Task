"use client";
import { usePathname } from "next/navigation";
import { useContext, ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login";

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext is missing. Make sure AuthProvider wraps your app."
    );
  }

  const { logout } = context;

  return hideLayout ? (
    children
  ) : (
    <div className="flex min-h-screen">
      <Sidebar handleLogout={logout} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
