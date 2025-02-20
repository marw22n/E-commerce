import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { authContext } from '../../components/Contexts/AuthContext'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'

export default function Layout() {
  const {IsLoading} =  useContext(authContext)
  return (
    <div>

    <>
        <Navbar/>
        <div className="container py-10">
         <Outlet/>
        </div>
        <Footer/>
    </>
    </div>
  )
}
