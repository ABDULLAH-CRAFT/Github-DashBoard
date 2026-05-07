import { Link } from "react-router";
import AuthLogin from "../authforms/AuthLogin";

const Login = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gray-950">

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-purple-700 opacity-20 blur-[120px]" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-blue-600 opacity-20 blur-[100px]" />
      <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] rounded-full bg-indigo-500 opacity-10 blur-[80px]" />

      {/* Floating glass card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-3xl p-8 flex flex-col gap-6"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Top icon */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to continue 
            </p>
          </div>
        </div>

        {/* Form */}
        <AuthLogin />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Register */}
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-white font-medium hover:text-gray-200 transition-colors underline underline-offset-2"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Bottom credit */}
      <p className="absolute bottom-4 text-xs text-gray-600">
        © 2026 MaterialM. All rights reserved.
      </p>
    </div>
  );
};

export default Login;