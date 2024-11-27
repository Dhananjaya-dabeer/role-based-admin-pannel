
import {Link, Outlet} from "react-router-dom"
import React, { useState } from 'react';
import { GiOverInfinity } from "react-icons/gi";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logoutFailure, logoutSuccess } from "../redux/user/userSlice";


const NavBar = ({toggleSidebar,isSidebarOpen }) => {

  const dispatch = useDispatch()

  const handleLogout = async() => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/auth/logout`,{
          method: "POST",
          headers: {
            "Content-Type": "Application/json"
          },
          credentials: 'include'
        })
        const result = await response.json()
        if(result.success == false){
          dispatch(logoutFailure(result.message))
          toast.warn(result.message || "Internal error")
          return
        }
        toast.success(result.message)
        dispatch(logoutSuccess())
    } catch (error) {
      toast.error(error.message || "Internal error")
      dispatch(logoutFailure("Login failed"))
    }
  }  

  return (
    <div>
        <div className='bg-[#FFF8E3] shadow-sm'>
            <div className="flex justify-between items-center p-5">
                <div className="sm:hidden" onClick={(e) => e.stopPropagation()}>
                <Sidebar toggle={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
                </div>
                <div className='hidden space-x-5 items-center sm:flex '>
                <Link to={'/'} className="pr-7"><GiOverInfinity className="text-xl" /></Link>
                <Link to={'/'} className="hidden sm:inline-block">Home</Link>
                <Link to={'/employees'} className="hidden sm:inline-block">Employees</Link>
                <Link to={'/reports'} className="hidden sm:inline-block">Reports</Link>
                </div>
                <div>
                <Link to={'/login'} onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </div>
        <main className="p-2 sm:p-5">
            <Outlet/>
        </main>
    </div>
  )
}

export default NavBar