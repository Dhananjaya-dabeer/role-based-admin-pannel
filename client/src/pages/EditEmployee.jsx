import React, { useEffect, useState } from 'react'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { catchHandler, resultCheck } from '../utils/utitlityFunctions'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {

    const [isHidden1, setIsHidden1] = useState(false)
    const [isHidden2, setIsHidden2] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        email: '',
    })
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        ;(async() => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/get/single/${id}`, {
                    method: "GET",
                    credentials: "include"
                })
                const result = await response.json()
                const {username, email, role} = result.data
                setFormData({
                    username,
                    email,
                    role
                })
                resultCheck(dispatch, result)
            } catch (error) {
                catchHandler(dispatch, error)
            }

        })()
    },[])


    const handleChagne = (e) => {
        setFormData(prev => (
            {...prev, [e.target.id]: e.target.value}
        ))
    }
  
    const handleFormSubmit = async(e) => {
        e.preventDefault()
        for(let key in formData){
            if(formData[key].trim() === ''){
                return toast.warn(`${key.charAt(0).toUpperCase() + key.slice(1)} can't be empty!`)
            }
        }
        try {   
            const respone = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/create/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })
            const result = await respone.json()
            resultCheck(dispatch, result, navigate, '/employees')
            
        } catch (error) {
            console.log(error)
            catchHandler(dispatch,error)
        }
    }

  return (
    <div className='w-full h-full'>     
        <form onSubmit={handleFormSubmit}>
            <div className="grid gap-6 mb-6">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                    <input type="text" id="username" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5    " placeholder="John" value={formData.username} onChange={handleChagne} />
                </div>
                
                <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 ">Role</label>
                    {/* <input type="text" id="role" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5    " placeholder="Moderator"  onChange={handleChagne} /> */}
                    <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " onChange={handleChagne} value={formData.role}>
                        <option selected>Choose a role</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="doctor">Doctor</option>
                        <option value="lab_tech">Lab_tech</option>
                        <option value="nurse">Nurse</option>
                    </select>
                </div>  
               
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                <input type="email" id="email" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5    " placeholder="john.doe@company.com"  onChange={handleChagne} value={formData.email} />
            </div> 
            <button type="submit" className="text-white bg-[#E6A4B4] p-2 rounded-lg hover:bg-[#D28A9E] hover:shadow-lg hover:text-black hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Update</button>
        </form>
    </div>
  )
}

export default EditEmployee