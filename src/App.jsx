import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='min-h-full flex flex-col h-screen '> 
      <Header />
      <main className='flex-1 h-full overflow-y-auto scroll-box bg-zinc-950'>
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
