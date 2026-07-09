import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Navbar from './Navbar'

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await api.get("/complaints/my");
                setComplaints(res.data.complaints);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComplaints()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="py-20 px-6 flex flex-wrap gap-6">
                {complaints.map((complaint) => {
                    return (
                        <div
                            key={complaint._id}
                            className="bg-white border border-slate-200 rounded-xl shadow-sm w-full max-w-xl p-5"
                        >
                            {/* Top: image beside title + description */}
                            <div className="flex gap-4">
                                {complaint.imageUrl && (
                                    <img
                                        src={complaint.imageUrl}
                                        alt={complaint.title}
                                        className="w-32 h-32 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                                    />
                                )}
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-semibold text-slate-900 text-lg leading-snug">
                                        {complaint.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">
                                        {complaint.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom: meta info */}
                            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-y-3 text-sm">
                                <p>
                                    <span className="text-slate-500">Position:</span>{" "}
                                    <span className="text-slate-900 font-medium">
                                        {complaint.latitude}, {complaint.longitude}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-slate-500">Department:</span>{" "}
                                    <span className="text-slate-900 font-medium">{complaint.department || "N/A"}</span>
                                </p>

                                <p>
                                    <span className="text-slate-500">Status:</span>{" "}
                                    <span className={
                                        complaint.status === 'resolved' || complaint.status === 'completed'
                                            ? 'text-emerald-500 font-semibold capitalize'
                                            : complaint.status === 'in-progress' || complaint.status === 'assigned'
                                                ? 'text-amber-500 font-semibold capitalize'
                                                : 'text-red-500 font-semibold capitalize'
                                    }>{complaint.status || "pending"}</span>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyComplaints
