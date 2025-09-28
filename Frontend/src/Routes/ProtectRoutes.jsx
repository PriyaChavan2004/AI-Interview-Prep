import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtectRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.userReducer)

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return children
}
