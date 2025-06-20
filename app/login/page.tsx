"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext is undefined");

  const { auth, login, loading } = context;

  // ✅ منع إظهار صفحة اللوجين إذا المستخدم بالفعل مسجل الدخول
  useEffect(() => {
    if (!loading && auth) {
      router.replace("/dashboard");
    }
  }, [loading, auth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      Cookies.set("token", "mock_token");
      login();
      toast.success("Login Successful 🎉");
      router.push("/dashboard");
    } else {
      toast.error("Please fill in both fields");
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>; // ⬅️ يمنع الفلاش

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Restart Admin Login
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
