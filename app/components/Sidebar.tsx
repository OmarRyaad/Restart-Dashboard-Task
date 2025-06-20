"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Sidebar({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "📊 Dashboard" },
    { href: "/products", label: "🛍️ Products" },
    { href: "/settings", label: "⚙️ Settings" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`md:w-64 w-64 bg-gray-900 text-white p-6 flex flex-col space-y-6 shadow-xl 
    ${
      isOpen
        ? "fixed top-0 left-0 h-full z-40 transition-transform translate-x-0"
        : "fixed top-0 left-0 h-full z-40 transition-transform -translate-x-full"
    } 
    md:static md:translate-x-0 md:h-auto md:z-0`}
      >
        <h1 className="text-2xl font-bold mb-4 text-blue-400">
          Restart Dashboard
        </h1>

        <nav className="flex flex-col space-y-2">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
          >
            🔒 Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
