import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { User } from 'lucide-react';
const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        api.get("/auth/me")
            .then((res) => setRole(res.data.user.role))
            .catch(() => setRole(null));
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            navigate("/");
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-[1000] flex items-center px-10">

            {/* Left */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">NAGARSETU</h1>
            </div>

            {/* Center */}
            <div className="flex-1 flex justify-center h-full">

                    <Link
                        to="/dashboard"
                        className="h-full px-5 flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        Dashboard
                    </Link>

                {role === "admin" ? (
                    <Link
                        to="/admin/complaints"
                        className="h-full px-5 flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        View Complaints
                    </Link>
                ) : (
                    <>
                        <Link
                            to="/report"
                            className="h-full px-5 flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-200"
                        >
                            Lodge a Complaint
                        </Link>

                        <Link
                            to="/analytics"
                            className="h-full px-5 flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-200"
                        >
                            Analytics
                        </Link>

                        <Link
                            to="/my-complaints"
                            className="h-full px-5 flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors duration-200"
                        >
                            My Complaints
                        </Link>
                    </>
                )}
            </div>

            {/* Right */}
            <div className="flex-1 flex justify-end items-center relative gap-4">
                {/* User Icon Button */}
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors duration-200 focus:outline-none flex items-center justify-center cursor-pointer"
                >
                    <User className="w-5 h-5 text-slate-700" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-14 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-sm py-1.5 flex flex-col z-50 overflow-hidden">
                        <Link
                            to="/my-profile"
                            className="px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            See Profile
                        </Link>
                        <div className="h-[1px] bg-slate-100 mx-2"></div>
                        <button
                            onClick={() => {
                                setIsDropdownOpen(false);
                                handleLogout();
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors duration-200 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;