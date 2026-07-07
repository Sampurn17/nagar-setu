import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Navbar from './Navbar'

const Report = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    latitude: "",
    longitude: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/complaints", form);
      alert("Complaint submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen relative flex ">
        <img src='https://images.unsplash.com/photo-1649042964070-8eb14ea4da7d?q=80&w=1423&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-screen w-screen absolute inset-0 object-cover' /><div className="absolute inset-0 bg-black/60"></div>


        <form onSubmit={handleSubmit} className="bg-white relative p-8 rounded-lg shadow-lg w-1/2 flex flex-col gap-5">

          <h1 className="text-3xl my-16 font-bold text-center mb-2">
            Report a Complaint
          </h1>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter complaint title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Description
            </label>
            <textarea
              placeholder="Describe your complaint"
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL (optional)"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Latitude
            </label>
            <input
              type="number"
              placeholder="Enter latitude"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Longitude
            </label>
            <input
              type="number"
              placeholder="Enter longitude"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="">Select Department</option>
              <option value="Roads">Roads</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Street Lighting">Street Lighting</option>
              <option value="Others">Others...</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit a complaint
          </button>
        </form>

      </div>




    </div>
  )
}

export default Report