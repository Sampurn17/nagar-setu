import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import Navbar from './Navbar'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster';
import redLocationIcon from '../assets/red-location.png'
import yellowLocationIcon from '../assets/yellow-location.png'
import blueLocationIcon from '../assets/blue-location.png'
import api from '../api/axios'

const summaryCards = [
  {
    label: "Total Issues Reported",
    value: 100,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
  },
  {
    label: "Resolved This Month",
    value: 100,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-emerald-500 to-emerald-600",
  },
  {
    label: "Active Dispatches",
    value: 100,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-amber-500 to-amber-600",
  },
];

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    async function fetchComplaints() {
      try {
        const res = await api.get("/complaints");
        setComplaints(res.data.complaints);
      } catch (err) {
        console.log(err);
      }
    }
    fetchComplaints();
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

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex-1 flex flex-col pt-16 overflow-hidden">

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4">
          {summaryCards.map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-r ${card.color} text-white rounded-xl p-5 flex items-center gap-4 shadow-lg`}
            >
              <div className="bg-white/20 rounded-lg p-2">
                {card.icon}
              </div>
              <div>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm text-white/80">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Map + Sidebar */}
        <div className="flex-1 flex mx-6 mb-4 rounded-xl overflow-hidden shadow-lg">
          <div className="flex-1 relative">
            <MapContainer center={[28.6139, 77.2090]} zoom={13} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerClusterGroup
                key={complaints.length}
                chunkedLoading
                iconCreateFunction={(cluster) => {
                  return new divIcon({
                    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
                    className: "h-12 w-12 rounded-full bg-blue-100 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold text-2xl",
                    iconSize: [40, 40],
                  })
                }}
              >
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
              </MarkerClusterGroup>
            </MapContainer>
          </div>

          <div className="w-1/3 bg-white border-l overflow-y-auto p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Activity</h2>
            <p className="text-sm text-gray-500">Complaint updates will appear here.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard