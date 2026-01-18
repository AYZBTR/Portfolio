import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <AlertCircle className="relative text-red-500" size={120} strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist.  It might have been moved or deleted.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/30"
        >
          <Home size={24} />
          Back to Home
        </Link>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay:  '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}