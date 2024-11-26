import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {

    const {currentUser} = useSelector(state => state.user)
    if(currentUser.role !== "admin"){
        return <Navigate to={"/unauthorized"}/>
    }
  return children
    
}

export default AdminRoute