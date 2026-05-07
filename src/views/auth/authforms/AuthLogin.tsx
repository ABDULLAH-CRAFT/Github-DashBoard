import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser, LoginData } from "src/api/auth";

const AuthLogin = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!loginData.username || !loginData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(loginData);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
  };

  const inputFocusClass =
    "w-full px-4 py-3 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Username */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Username
        </label>
        <input
          type="text"
          required
          placeholder="e.g. emilys"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          style={inputStyle}
          className={inputFocusClass}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            Password
          </label>
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            style={inputStyle}
            className={`${inputFocusClass} pr-12`}
          />
          {/* Show/hide toggle */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-xs"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="text-xs text-red-400 text-center px-3 py-2 rounded-lg"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
        style={{
          background: loading
            ? "rgba(255,255,255,0.1)"
            : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.4)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Signing in...
          </span>
        ) : (
          "Sign in"
        )}
      </button>

      {/* Test credentials */}
      <div
        className="text-xs text-center text-gray-500 px-3 py-2 rounded-lg"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        Demo: <span className="text-gray-300">emilys</span> / <span className="text-gray-300">emilyspass</span>
      </div>

    </form>
  );
};

export default AuthLogin;