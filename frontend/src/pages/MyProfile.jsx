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
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 my-16">My Profile</h1>

        <div className="space-y-3 ">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </>
  );
};

export default MyProfile;