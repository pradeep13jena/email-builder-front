import React from 'react'
import '../styles/style.css'
import { Outlet } from 'react-router-dom'
import CreateTemplate from './CreateTemplate'
import Header from './Header'
import Drawer from './Drawer'

export default function App() {
  return (
    <div className='flex flex-col h-screen bg-[#dad7cd]'>
      <Header></Header>
      <div className='flex w-full'>
        <CreateTemplate/>
        <Drawer/>
      </div>
    </div>
  )
}
