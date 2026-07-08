import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "./Navbar";
const MyProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user)
      } catch (error) {
        alert("Failed to fetch user");
      }
    }
    fetchUser();
  }, []);

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
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          
          {/* Header Area */}
          <div className="bg-indigo-600 h-32 relative flex justify-center">
            {/* Avatar Circle */}
            <div className="absolute -bottom-12 w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-md">
              <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-4xl font-bold uppercase">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-16 pb-8 px-8 text-center">
            <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
            <p className="text-sm font-medium text-indigo-600 mt-1 uppercase tracking-wider">{user.role}</p>
            
            <div className="mt-8 space-y-4 text-left">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors hover:bg-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Email Address</p>
                <p className="text-slate-800 font-medium">{user.email}</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors hover:bg-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Account Role</p>
                <p className="text-slate-800 font-medium capitalize">{user.role}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;