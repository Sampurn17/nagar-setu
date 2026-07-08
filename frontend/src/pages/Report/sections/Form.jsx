import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../../api/axios'

const Form = ({ form, setForm }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]:
        e.target.name === "latitude" ||
          e.target.name === "longitude"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);
      formData.append("department", form.department);

      if (image) {
        formData.append("image", image);
      }

      await api.post("/complaints", formData);
      alert("Complaint submitted successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        department: "",
      });
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 relative p-8 rounded-lg shadow-lg w-1/2 flex flex-col gap-5 overflow-y-auto">
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
          Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name="imageUrl"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex items-center gap-3 border-2 border-dashed border-gray-400 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-600">
            {image ? image.name : "Click to upload an image"}
          </span>
        </label>
        {preview && (
          <div className="mt-2 relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-40 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">
          Latitude
        </label>
        <input
          type="number" step="0.01"
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
          type="number" step="0.01"
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
  )
}

export default Form
