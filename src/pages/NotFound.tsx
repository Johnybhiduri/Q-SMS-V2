import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found | Q-SMS";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0e16] px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(17_19_26/0.04),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
      
      <div className="relative z-10 text-center max-w-xl w-full">
        {/* 404 */}
        <h1 className="text-7xl font-bold text-brand-600 dark:text-brand-400 tracking-tight">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-[#11131a] dark:text-white">
          Page not found
        </h2>
        <p className="mt-3 text-sm text-[#5c6275] dark:text-[#9aa1b2] leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back to where things actually work.
        </p>
        
        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 transition duration-200 font-medium text-white"
          >
            Go to Homepage
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border border-[#11131a]/10 bg-white hover:bg-[#f5f6fa] dark:border-white/10 dark:bg-[#11161f] dark:hover:bg-[#161b26] transition duration-200 font-medium text-[#11131a] dark:text-white"
          >
            Go Back
          </button>
        </div>
        
        {/* Small footer text */}
        <p className="mt-12 text-xs text-[#5c6275] dark:text-[#9aa1b2]">
          Q-SMS © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default NotFound;