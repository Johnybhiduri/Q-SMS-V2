import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SignIn from "./Signin";
import SignUp from "./Signup";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  const switchTo = (next: "signin" | "signup") => {
    setMode(next);
    setSearchParams({ mode: next });
  };

  return (
    // ✅ FIX 1: Changed items-center to items-start sm:items-center. 
    // This prevents the tall SignUp form from being pushed off the top of the screen on mobile.
    // Removed overflow-hidden from the main wrapper so the page can scroll vertically if needed.
    <div className="relative min-h-screen w-full bg-[#f5f6fa] dark:bg-[#0a0e16] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[100px] dark:bg-brand-500/5" />
      <div className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-500/5" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[480px] rounded-2xl border border-[#11131a]/8 bg-white shadow-xl dark:border-white/10 dark:bg-[#11161f] dark:shadow-2xl">
        
        {/* Tabs */}
        <div className="flex border-b border-[#11131a]/8 dark:border-white/10 relative">
          <button
            onClick={() => switchTo("signin")}
            className={`flex-1 py-4 text-sm font-medium transition-colors z-10 ${
              mode === "signin"
                ? "text-[#11131a] dark:text-white"
                : "text-[#5c6275] hover:text-[#11131a] dark:text-[#9aa1b2] dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchTo("signup")}
            className={`flex-1 py-4 text-sm font-medium transition-colors z-10 ${
              mode === "signup"
                ? "text-[#11131a] dark:text-white"
                : "text-[#5c6275] hover:text-[#11131a] dark:text-[#9aa1b2] dark:hover:text-white"
            }`}
          >
            Sign Up
          </button>
          {/* Sliding Indicator */}
          <div
            className="absolute bottom-0 h-0.5 w-1/2 bg-brand-600 transition-transform duration-300 ease-in-out"
            style={{ transform: mode === "signup" ? "translateX(100%)" : "translateX(0)" }}
          />
        </div>

        {/* Content Area */}
        <div className="overflow-hidden">
          {/* ✅ FIX 2: Explicitly set track to 200% width and children to 50% (w-1/2). 
              This guarantees translateX(-50%) moves exactly one panel width, preventing the "half-and-half" glitch. */}
          <div
            className="flex w-[200%] transition-transform duration-300 ease-in-out"
            style={{ transform: mode === "signup" ? "translateX(-50%)" : "translateX(0)" }}
          >
            <div className="w-1/2 shrink-0 px-6 py-8 sm:px-8 sm:py-10">
              <SignIn onSwitch={() => switchTo("signup")} />
            </div>
            <div className="w-1/2 shrink-0 px-6 py-8 sm:px-8 sm:py-10">
              <SignUp onSwitch={() => switchTo("signin")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;