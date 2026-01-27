import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
// Agar tumne react-toastify install nahi kiya hai toh terminal mein: npm install react-toastify
// Agar abhi nahi karna, toh niche toast.success/error ko alert() se replace kar dena.
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isSignup) {
        // Sign Up Logic
        result = await supabase.auth.signUp({ email, password });
      } else {
        // Login Logic
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) throw result.error;

      toast.success(
        isSignup ? "Account created! Logging in..." : "Logged in successfully!",
      );

      // Agar session mil gaya, toh parent component ko bata do
      if (result.data.session) {
        onSuccess(result.data.session);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black">
      <ToastContainer theme="dark" />
      <div className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-96 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          {isSignup ? "Create Account" : "WebAutomy Login"}
        </h2>
        <p className="text-neutral-500 text-center mb-6 text-sm">
          {isSignup
            ? "Start your automation journey"
            : "Welcome back, Commander"}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black/50 text-white rounded-lg border border-white/10 focus:border-brand-blue focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black/50 text-white rounded-lg border border-white/10 focus:border-brand-blue focus:outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-neutral-400 mt-6 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-brand-blue ml-2 hover:underline font-medium"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
