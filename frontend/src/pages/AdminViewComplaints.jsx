import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client';
import api from '../api/axios'
import Navbar from './Navbar'

const AdminViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Create socket connection
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    async function fetchComplaints() {
      try {
        const res = await api.get("/complaints");
        setComplaints(res.data.complaints);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaints();

    // Listen for brand new complaints
    socket.on('new_complaint_submitted', (newComplaint) => {
      console.log("A citizen just filed a new issue live!", newComplaint);
      // Prepend the new complaint to the top of the list instantly
      setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
    });

    return () => {
      socket.off('new_complaint_submitted');
      socket.disconnect();
    };
  }, []);

  const handleStatusUpdate = async (complaintId, newStatus) => {
    setUpdatingId(complaintId);
    try {
      const res = await api.patch(`/complaints/${complaintId}/status`, { status: newStatus });
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === complaintId ? { ...c, status: res.data.complaint.status } : c
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-red-50 text-red-500 border border-red-200',
      assigned: 'bg-amber-50 text-amber-500 border border-amber-200',
      'in-progress': 'bg-amber-50 text-amber-500 border border-amber-200',
      resolved: 'bg-emerald-50 text-emerald-500 border border-emerald-200',
      completed: 'bg-emerald-50 text-emerald-500 border border-emerald-200',
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-10 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">All Complaints</h1>
          <p className="text-slate-500 mt-1">Review and manage all citizen complaints</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-slate-500">Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-slate-500">No complaints found.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {complaints.map((complaint) => {
              const isUpdating = updatingId === complaint._id;
              const currentStatus = complaint.status || 'pending';

              return (
                <div
                  key={complaint._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="flex">
                    {/* Image */}
                    {complaint.imageUrl && (
                      <div className="flex-shrink-0 w-48">
                        <img
                          src={complaint.imageUrl}
                          alt={complaint.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6">
                      {/* Top Row: Title + Status */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-xl font-semibold text-slate-900 leading-tight">
                          {complaint.title}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap ${getStatusBadge(currentStatus)}`}>
                          {currentStatus}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {complaint.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500 mb-5">
                        <span>
                          <span className="font-medium text-slate-700">Dept:</span> {complaint.department}
                        </span>
                        {complaint.createdBy && (
                          <span>
                            <span className="font-medium text-slate-700">By:</span> {complaint.createdBy.name || 'Unknown'}
                          </span>
                        )}
                        <span>
                          <span className="font-medium text-slate-700">Location:</span> {complaint.latitude?.toFixed(4)}, {complaint.longitude?.toFixed(4)}
                        </span>
                        {complaint.createdAt && (
                          <span>
                            <span className="font-medium text-slate-700">Date:</span> {new Date(complaint.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleStatusUpdate(complaint._id, 'in-progress')}
                          disabled={isUpdating || currentStatus === 'in-progress'}
                          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${currentStatus === 'in-progress'
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'bg-white text-blue-600 border border-blue-600 hover:bg-slate-50'
                            }`}
                        >
                          {isUpdating ? '...' : 'In Progress'}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(complaint._id, 'resolved')}
                          disabled={isUpdating || currentStatus === 'resolved'}
                          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${currentStatus === 'resolved'
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'bg-white text-blue-600 border border-blue-600 hover:bg-slate-50'
                            }`}
                        >
                          {isUpdating ? '...' : 'Resolved'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminViewComplaints
