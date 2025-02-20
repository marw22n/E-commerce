import React, { useContext, useState } from 'react'
import { authContext } from '../components/Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuthRoute({children}) {
    const{IsLoggedIn} =  useContext(authContext)
  return (
    <div>{!IsLoggedIn ? children : <Navigate to={"/"}/>}</div>
  )
}
