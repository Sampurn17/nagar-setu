import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Report from './pages/Report';
import Analytics from './pages/Analytics';
import MyComplaints from './pages/MyComplaints';
import MyProfile from './pages/MyProfile';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path='/report' element={
        <ProtectedRoute>
          <Report />
        </ProtectedRoute>
      } />
      <Route path='/analytics' element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      } />

      <Route path='/my-complaints' element={
        <ProtectedRoute>
          <MyComplaints />
        </ProtectedRoute>
      } />
      <Route path='/my-profile' element={
        <ProtectedRoute>
          <MyProfile />
        </ProtectedRoute>
      } />


    </Routes>

  )
}

export default App
