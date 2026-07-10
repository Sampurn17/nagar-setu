import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../../api/axios'
import { toast, Slide } from 'react-toastify'
import { z } from "zod";

const createComplaintSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required"),
  latitude: z.union([z.number(), z.string().min(1, "Latitude is required")]),
  longitude: z.union([z.number(), z.string().min(1, "Longitude is required")]),
  department: z.string().min(1, "Department is required"),
});

const Form = ({ form, setForm }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
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

    const result = createComplaintSchema.safeParse(form);

    if (!result.success) {
      const errorMessage = result.error?.issues?.[0]?.message || result.error?.errors?.[0]?.message || "Please fill all required fields correctly.";
      toast.error(errorMessage, {
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
      return;
    }

    setLoading(true);
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
      toast.success("Complaint submitted successfully!", {
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
      toast.error(err.response?.data?.message || "Failed to submit complaint", {
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
    <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm border-r border-slate-200 relative p-8 shadow-sm w-1/2 flex flex-col gap-5 overflow-y-auto">
      <h1 className="text-3xl my-16 font-bold text-slate-900 text-center mb-2">
        Report a Complaint
      </h1>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-slate-700 text-sm">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter complaint title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-slate-700 text-sm">
          Description
        </label>
        <textarea
          placeholder="Describe your complaint"
          rows="4"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-slate-700 text-sm">
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
          className="flex items-center gap-3 border-2 border-dashed border-blue-600 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
        >
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-slate-600">
            {image ? image.name : "Click to upload an image"}
          </span>
        </label>
        {preview && (
          <div className="mt-2 relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-40 object-cover rounded-xl border border-slate-200"
            />
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 cursor-pointer"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-slate-700 text-sm">
          Latitude
        </label>
        <input
          type="number" step="0.01"
          placeholder="Enter latitude"
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-slate-700 text-sm">
          Longitude
        </label>
        <input
          type="number" step="0.01"
          placeholder="Enter longitude"
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold text-slate-700 text-sm">
          Department
        </label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="border border-slate-200 bg-slate-50 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
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
        disabled={loading}
        className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Submitting...
          </>
        ) : (
          'Submit a complaint'
        )}
      </button>
    </form>
  )
}

export default Form
