import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12 mt-auto relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <h3 className="text-2xl font-bold gradient-text">DevDiary</h3>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              A modern platform for developers to journal their coding journey, share technical insights,
              and connect with a community passionate about technology and innovation.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/vee-kodes" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200">
                <span className="text-slate-400 hover:text-white">GitHub</span>
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/violachepchirchir" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200">
                <span className="text-slate-400 hover:text-white">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Home
              </Link>
              <Link to="/dashboard" className="block text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Dashboard
              </Link>
              <Link to="/create-post" className="block text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Write Post
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-slate-400 hover:text-blue-400 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contact" className="block text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} DevDiary . Design by <a href="https://github.com/vee-kodes" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-200"><strong>Viola C.</strong></a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
