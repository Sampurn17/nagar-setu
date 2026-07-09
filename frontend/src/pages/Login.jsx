import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import { toast, Slide } from "react-toastify"

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/login", form);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-right",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src='https://images.unsplash.com/photo-1668971786470-441d20a8fdca?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='absolute inset-0 w-full h-full object-cover'
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/58"></div>

      {/* Back Arrow */}
      <Link to="/" className="absolute top-6 left-6 z-20 p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-200">
        <ArrowLeft className="w-5 h-5 text-white" />
      </Link>

      {/* Card */}
      <div className="relative z-10 w-[90%] max-w-[440px] animate-fade-in">
        <div className="bg-[rgba(15,23,42,0.75)] backdrop-blur-[8px] border border-white/10 rounded-2xl shadow-2xl px-8 py-10">

          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-white/50 text-center mb-8">
            Sign in to continue reporting and tracking civic complaints.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Email</label>
              <input
                type="text"
                placeholder="you@example.com"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-[52px] bg-slate-900/60 border border-slate-700 rounded-xl px-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name='password'
                value={form.password}
                onChange={handleChange}
                className="w-full h-[52px] bg-slate-900/60 border border-slate-700 rounded-xl px-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20 mt-1 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-sm text-white/50 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;