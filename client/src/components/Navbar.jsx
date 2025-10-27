import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-200/50 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            DevDiary
          </Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group"
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-200 hover:scale-105 relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                to="/register"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Join DevDiary
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-all duration-200"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-xl border-t border-slate-200/50 px-6 py-6 space-y-4 animate-fade-in">
          <Link
            to="/"
            className="block text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-slate-700 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-slate-50 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all duration-200 shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Join DevDiary
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
