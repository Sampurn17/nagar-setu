import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { User } from 'lucide-react';
const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            navigate("/");
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-[1000] flex items-center px-8">

            {/* Left */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold">NAGARSETU</h1>
            </div>

            {/* Center */}
            <div className="flex-1 flex justify-center h-full">

                <Link
                    to="/dashboard"
                    className="h-full px-6 flex items-center hover:bg-gray-200 hover: transition-all duration-200"
                >
                    Dashboard
                </Link>

                <Link
                    to="/report"
                    className="h-full px-6 flex items-center hover:bg-gray-200 hover: transition-all duration-200"
                >
                    Lodge a Complaint
                </Link>

                <Link
                    to="/analytics"
                    className="h-full px-6 flex items-center hover:bg-gray-200 hover: transition-all duration-200"
                >
                    Analytics
                </Link>

                <Link
                    to="/my-complaints"
                    className="h-full px-6 flex items-center hover:bg-gray-200 hover: transition-all duration-200"
                >
                    My Complaints
                </Link>
            </div>

            {/* Right */}
            <div className="flex-1 flex justify-end items-center relative gap-4">
                {/* User Icon Button */}
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 rounded-full border border-gray-300 bg-gray-50 hover:bg-gray-200 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
                >
                    <User className="size-6 text-gray-700" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-12 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 flex flex-col z-50 overflow-hidden">
                        <Link
                            to="/my-profile"
                            className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 font-medium transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            See Profile
                        </Link>
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                        <button
                            onClick={() => {
                                setIsDropdownOpen(false);
                                handleLogout();
                            }}
                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer"
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