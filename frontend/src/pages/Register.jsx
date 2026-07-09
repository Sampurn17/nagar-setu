import React from 'react';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { confirmPassword, ...userData } = form;

    try {
      await api.post("/auth/register", userData);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
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
            Create Your Account
          </h1>
          <p className="text-sm text-white/50 text-center mb-8">
            Join NagarSetu and contribute to building a smarter city.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-[52px] bg-slate-900/60 border border-slate-700 rounded-xl px-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
              />
            </div>

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
                placeholder="Create a password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full h-[52px] bg-slate-900/60 border border-slate-700 rounded-xl px-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full h-[52px] bg-slate-900/60 border border-slate-700 rounded-xl px-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-[52px] bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20 mt-1 cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-sm text-white/50 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;