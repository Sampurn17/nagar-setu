import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "./Navbar";
import { toast, Slide } from "react-toastify";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
});

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user)
      } catch (error) {
        toast.error("Failed to fetch user", {
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
      }
    }
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = updateProfileSchema.safeParse(editForm);
    if (!result.success) {
      const errorMessage = result.error?.issues?.[0]?.message || result.error?.errors?.[0]?.message || "Invalid input";
      toast.error(errorMessage, {
        position: "top-right", autoClose: 1300, hideProgressBar: false,
        closeOnClick: false, pauseOnHover: true, draggable: true, theme: "colored", transition: Slide
      });
      return;
    }

    setLoading(true);
    try {
      const dataToUpdate = { name: editForm.name, email: editForm.email };
      if (editForm.password) dataToUpdate.password = editForm.password;

      const res = await api.patch("/auth/profile/update", dataToUpdate);
      setUser(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully", {
        position: "top-right", autoClose: 1300, hideProgressBar: false,
        closeOnClick: false, pauseOnHover: true, draggable: true, theme: "colored", transition: Slide
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        position: "top-right", autoClose: 1300, hideProgressBar: false,
        closeOnClick: false, pauseOnHover: true, draggable: true, theme: "colored", transition: Slide
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="p-10 flex justify-center items-center h-screen">
          <p className="text-xl font-medium">Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex justify-center items-center pt-32 pb-10 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header Area */}
          <div className="bg-slate-900 h-32 relative flex justify-center">
            {/* Avatar Circle */}
            <div className="absolute -bottom-12 w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
              <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-900 text-4xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-16 pb-8 px-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-sm font-medium text-blue-600 mt-1 uppercase tracking-wider">{user.role}</p>
            
            {isEditing ? (
              <form onSubmit={handleUpdate} className="mt-8 space-y-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                  <input type="text" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">New Password (Optional)</label>
                  <input type="password" placeholder="Leave blank to keep current" value={editForm.password} onChange={e => setEditForm({...editForm, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 px-4 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-colors cursor-pointer">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-70">Save</button>
                </div>
              </form>
            ) : (
              <>
                <div className="mt-8 space-y-4 text-left">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 transition-colors hover:bg-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Email Address</p>
                    <p className="text-slate-900 font-medium">{user.email}</p>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 transition-colors hover:bg-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Account Role</p>
                    <p className="text-slate-900 font-medium capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button onClick={() => { setIsEditing(true); setEditForm({ name: user.name, email: user.email, password: "" }); }} className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;