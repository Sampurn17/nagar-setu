import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css'
import Navbar from './Navbar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon } from 'leaflet'

import redLocationIcon from '../assets/red-location.png'
import yellowLocationIcon from '../assets/yellow-location.png'
import blueLocationIcon from '../assets/blue-location.png'
import api from '../api/axios'
import { MapPin } from 'lucide-react'

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Create socket connection when Dashboard mounts
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");
    socketRef.current = socket;

    // Fetch initial complaints
    async function fetchComplaints() {
      try {
        const res = await api.get("/complaints");
        setComplaints(res.data.complaints);
      } catch (err) {
        console.log(err);
      }
    }
    fetchComplaints();

    // Listen for real-time status updates
    socket.on('complaint_status_updated', (updatedData) => {
      console.log("Real-time update received!", updatedData);

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === updatedData.id
            ? { ...complaint, status: updatedData.status }
            : complaint
        )
      );
    });

    // Listen for brand new complaints
    socket.on('new_complaint_submitted', (newComplaint) => {
      console.log("New complaint received live on map!", newComplaint);
      setComplaints((prevComplaints) => [newComplaint, ...prevComplaints]);
    });

    // Cleanup: remove listener and disconnect socket on unmount
    return () => {
      socket.off('complaint_status_updated');
      socket.off('new_complaint_submitted');
      socket.disconnect();
    };
  }, []);

  const getIcon = (status) => {
    let iconUrl = redLocationIcon;
    if (status === 'assigned' || status === 'in-progress') iconUrl = yellowLocationIcon;
    if (status === 'resolved' || status === 'completed') iconUrl = blueLocationIcon;

    return new Icon({
      iconUrl,
      iconSize: [38, 38],
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'resolved' || status === 'completed') return 'bg-emerald-50 text-emerald-500 border border-emerald-200';
    if (status === 'assigned' || status === 'in-progress') return 'bg-amber-50 text-amber-500 border border-amber-200';
    return 'bg-red-50 text-red-500 border border-red-200';
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex flex-col pt-16 overflow-auto">

        {/* Map + Sidebar */}
        <div className="flex mx-6 mt-4 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white" style={{ height: '65vh' }}>
          <div className="w-[72%] relative">
            <MapContainer center={[28.6139, 77.2090]} zoom={13} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

                {complaints.map((complaint) => {
                  const lat = parseFloat(complaint.latitude) || 28.6139;
                  const lng = parseFloat(complaint.longitude) || 77.2090;
                  return (
                    <Marker
                      key={complaint._id}
                      position={[lat, lng]}
                      icon={getIcon(complaint.status)}
                    >
                      <Popup>
                        {complaint.imageUrl && (
                          <img
                            src={complaint.imageUrl}
                            alt={complaint.title}
                            className="w-48 h-32 object-cover rounded"
                          />
                        )}
                        <h2 className="font-bold mt-2">{complaint.title}</h2>
                        <p>{complaint.description}</p>
                        <p className="text-sm text-gray-500">{complaint.department}</p>
                      </Popup>
                    </Marker>
                  );
                })}

            </MapContainer>

            {/* Map Legend */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200/60">
              <h4 className="text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-wider">Map Legend</h4>
              <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center bg-red-50 rounded-md border border-red-100">
                    <img src={redLocationIcon} alt="Unresolved" className="w-4 h-4 object-contain" />
                  </div>
                  <span className="text-slate-700 font-medium text-xs">Unresolved</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center bg-amber-50 rounded-md border border-amber-100">
                    <img src={yellowLocationIcon} alt="In Progress" className="w-4 h-4 object-contain" />
                  </div>
                  <span className="text-slate-700 font-medium text-xs">In Progress</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-50 rounded-md border border-blue-100">
                    <img src={blueLocationIcon} alt="Resolved" className="w-4 h-4 object-contain" />
                  </div>
                  <span className="text-slate-700 font-medium text-xs">Resolved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[28%] bg-white border-l border-slate-200 overflow-y-auto p-5">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
            {complaints.filter(c => c.status === 'resolved' || c.status === 'completed').length === 0 ? (
              <p className="text-sm text-slate-500">No resolved complaints yet.</p>
            ) : (
              <div className="space-y-3">
                {complaints
                  .filter(c => c.status === 'resolved' || c.status === 'completed')
                  .map((c) => (
                    <div key={c._id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-transform duration-200">
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug">{c.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{c.description}</p>

                      <div className="mt-3 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Department</span>
                          <span className="font-medium text-slate-900">{c.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Status</span>
                          <span className="font-semibold text-emerald-500 capitalize">{c.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Location</span>
                          <span className="font-medium text-slate-900">{c.latitude?.toFixed(4)}, {c.longitude?.toFixed(4)}</span>
                        </div>
                        {c.updatedAt && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Resolved</span>
                            <span className="font-medium text-slate-900">{new Date(c.updatedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Latest Complaints */}
        <div className="mx-6 mt-6 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Latest Complaints</h2>
          {complaints.length === 0 ? (
            <p className="text-sm text-slate-500">No complaints yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complaints.slice(0, 9).map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 transition-transform duration-200"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-sm font-semibold text-slate-900 leading-snug">{c.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize whitespace-nowrap ${getStatusBadge(c.status)}`}>
                      {c.status || 'pending'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department</span>
                      <span className="font-medium text-slate-900">{c.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Reported</span>
                      <span className="font-medium text-slate-900">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{c.latitude?.toFixed(4)}, {c.longitude?.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard