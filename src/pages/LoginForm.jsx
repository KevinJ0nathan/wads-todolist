import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Loading state
    if (user) navigate("/todolist");
  }, [user, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg bg-white shadow-md w-full max-w-sm p-5 sm:p-7 md:w-[400px]">
      <h1 className="text-xl font-semibold text-gray-700 text-center">
        Login to your account
      </h1>
      <form className="flex flex-col text-black gap-4" onSubmit={handleLogin}>
        <div className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-start">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-start">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md hover:bg-gray-800"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">or continue with</p>

        <button
          type="button"
          className="flex justify-center gap-2 items-center py-2 border border-gray-400 rounded-md hover:bg-gray-100"
          onClick={signInWithGoogle}
        >
          <FcGoogle />
          <p>Google</p>
        </button>

        <p className="text-center text-sm">
          Don't have an account?
          <Link to="/register" className="text-blue-500">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
