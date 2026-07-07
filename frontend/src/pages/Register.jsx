import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});
const handleChange=(e)=>{
  setForm({
    ...form,
    [e.target.name]:e.target.value,
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
    
    <div className="min-h-screen flex relative items-center justify-center">
       <img src='https://images.unsplash.com/photo-1668971786470-441d20a8fdca?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-screen w-screen absolute inset-0 object-cover'></img>
      <div className="absolute inset-0 bg-black/50"></div>
      <form onSubmit={handleSubmit}className="bg-white/60 p-8 relative rounded-lg shadow-lg w-96 flex flex-col gap-5">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create a New Account
        </h1>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Enter your email ID
          </label>
          <input
            type="text"
            placeholder="Email:"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Enter your Name
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}

            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Enter your Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name = "password"
            value = {form.password}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">
            Confirm your Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name = "confirmPassword"
            value = {form.confirmPassword}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>

      </form>
    </div>
  );
};

export default Register;