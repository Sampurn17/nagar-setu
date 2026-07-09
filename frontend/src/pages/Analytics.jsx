import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import api from '../api/axios'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
  PieChart, Pie, Legend,
  LineChart, Line
} from 'recharts'

const COLORS = ['#2563EB', '#F59E0B', '#10B981', '#64748B'];

const STATUS_COLORS = {
  pending: '#ef4444',
  assigned: '#f59e0b',
  'in-progress': '#f59e0b',
  resolved: '#10b981',
  completed: '#10b981',
};

const Analytics = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [deptRes, statusRes, monthlyRes] = await Promise.all([
          api.get("/analytics/department-counts"),
          api.get("/analytics/status-counts"),
          api.get("/analytics/monthly-trend").catch(() => ({ data: [] })),
        ]);
        setDepartmentData(deptRes.data);
        setStatusData(statusRes.data);
        setMonthlyData(monthlyRes.data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const totalComplaints = statusData.reduce((acc, item) => acc + item.count, 0);
  const resolvedComplaints = statusData.filter(s => s.status === 'resolved' || s.status === 'completed').reduce((acc, item) => acc + item.count, 0);
  const pendingComplaints = statusData.filter(s => s.status === 'pending' || s.status === 'assigned' || s.status === 'in-progress').reduce((acc, item) => acc + item.count, 0);

  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;

  // Sorted department data for rankings
  const topDepartments = [...departmentData].sort((a, b) => b.value - a.value);
  const mostReportedDept = topDepartments.length > 0 ? topDepartments[0].name : "—";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-3">
          <p className="text-sm font-semibold text-slate-900">{label || payload[0].name || payload[0].payload.month}</p>
          <p className="text-sm text-slate-500 mt-1">
            Count: <span className="font-bold text-slate-900">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent < 0.05) return null;
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-500 mt-1">Insights and trends across all citizen complaints</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading analytics...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Colored Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {/* Blue Card */}
              <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-blue-600 shadow-sm p-6 transition-transform duration-200 flex items-center gap-5">
                <div>
                  <p className="text-4xl font-bold text-slate-900">{totalComplaints}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Total Issues Reported</p>
                </div>
              </div>

              {/* Orange Card */}
              <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-amber-500 shadow-sm p-6 transition-transform duration-200 flex items-center gap-5">
                <div>
                  <p className="text-4xl font-bold text-slate-900">{pendingComplaints}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Pending Issues</p>
                </div>
              </div>

              {/* Green Card */}
              <div className="bg-white rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm p-6 transition-transform duration-200 flex items-center gap-5">
                <div>
                  <p className="text-4xl font-bold text-slate-900">{resolvedComplaints}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Resolved Issues</p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">


              {/* Pie Chart — Status Distribution */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-transform duration-200">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Status Distribution</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Resolution efficiency breakdown</p>
                </div>
                {statusData.length === 0 ? (
                  <p className="text-slate-400 text-center py-20">No data available</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={PieLabel}
                        outerRadius={110}
                        innerRadius={45}
                        dataKey="count"
                        nameKey="status"
                        strokeWidth={2}
                        stroke="#fff"
                      >
                        {statusData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={STATUS_COLORS[entry.status] || COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        formatter={(value) => (
                          <span className="text-sm text-gray-700 capitalize">{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              {/* Top Departments */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-transform duration-200">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">Top Reporting Departments</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Departments with highest issue volume</p>
                </div>
                {topDepartments.length === 0 ? (
                  <p className="text-slate-400 text-center py-20">No data available</p>
                ) : (
                  <div className="space-y-4">
                    {topDepartments.slice(0, 5).map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-400 w-4">{index + 1}.</span>
                          <span className="font-medium text-slate-900">{dept.name}</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {dept.value} complaints
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>




            {/* Bar Chart — Complaints by Department */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-transform duration-200">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Complaints by Department</h2>
                <p className="text-sm text-slate-500 mt-0.5">Volume of issues across city sectors</p>
              </div>
              {departmentData.length === 0 ? (
                <p className="text-slate-400 text-center py-20">No data available</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      angle={-20}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                      {departmentData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>



          </>
        )}
      </div>
    </div>
  )
}

export default Analytics