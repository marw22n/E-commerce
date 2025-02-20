import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../components/Contexts/AuthContext'

export default function ProtectedRoute({ children }) {

        const {IsLoggedIn} = useContext(authContext)
  return (
      <div>
          {IsLoggedIn? children : <Navigate to={"/login"}/>} 
      </div>
) 
}
