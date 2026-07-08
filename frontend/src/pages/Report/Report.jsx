import React from 'react'
import Navbar from '../Navbar'
import Form from './sections/Form'
import Map from './sections/Map'
import { useState } from "react";




const Report = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    department: "",
  });
  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <div className="flex-1 relative flex">

        <img src='https://images.unsplash.com/photo-1599230080795-a48439229cb7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGklMjBza3lsaW5lfGVufDB8fDB8fHww'
          className='h-screen w-screen absolute inset-0 object-cover z-0' />
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <Form form={form} setForm={setForm} />
        <Map form={form} setForm={setForm} />



      </div>
    </div>
  )
}

export default Report
