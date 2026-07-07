import React from 'react'
import Navbar from './Navbar'
const MyComplaints = () => {
  return (
    <div>
        <Navbar/>
        <div className="min-h-screen relative flex items-center justify-center">
          <img src='https://images.unsplash.com/photo-1649042964070-8eb14ea4da7d?q=80&w=1423&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-screen w-screen absolute inset-0 object-cover'/><div className="absolute inset-0 bg-black/50"></div>
        </div>
    </div>
  )
}

export default MyComplaints