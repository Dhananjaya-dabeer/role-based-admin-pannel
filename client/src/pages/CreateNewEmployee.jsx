import React, { useState } from 'react'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { catchHandler, resultCheck } from '../utils/utitlityFunctions'
import { useDispatch } from 'react-redux'

const CreateNewEmployee = () => {

    const [isHidden1, setIsHidden1] = useState(false)
    const [isHidden2, setIsHidden2] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const dispatch = useDispatch()

    const handleChagne = (e) => {
        setFormData(prev => (
            {...prev, [e.target.id]: e.target.value}
        ))
    }
  
    const handleFormSubmit = async(e) => {
        e.preventDefault()
        console.log("first")
        for(let key in formData){
            if(formData[key].trim() === ''){
                return toast.warn(`${key.charAt(0).toUpperCase() + key.slice(1)} can't be empty!`)
            }
        }
        try {   
            if(formData.password !== formData.confirm_password){
                return toast.warn("Passwords do not match. Please ensure both password fields are identical.")
            }
            const {confirm_password, ...rest} = formData
            const respone = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/create/employee`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                credentials: 'include',
                body: JSON.stringify(rest)
            })
            const result = await respone.json()
            resultCheck(dispatch, result)
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
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" id="username" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  onChange={handleChagne} />
                </div>
                
                <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                    {/* <input type="text" id="role" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Moderator"  onChange={handleChagne} /> */}
                    <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChagne}>
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
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="email" id="email" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com"  onChange={handleChagne} />
            </div> 
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className='flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '>
                <input type={isHidden1 ? "password" : "text"} id="password" className="outline-none border-none bg-inherit w-full"  placeholder="•••••••••"  onChange={handleChagne} />
                <div className="" onClick={ () => setIsHidden1(!isHidden1)}>
                      {isHidden1 ?
                          <BiSolidHide className='text-xl cursor-pointer' /> : <BiSolidShow className='text-xl cursor-pointer' /> 
                      }
                </div>
                </div>
            </div> 
            <div className="mb-6">
                <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
               <div className='flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '>
               <input type={isHidden2 ? "password" : "text"} id="confirm_password"className="outline-none border-none bg-inherit w-full" placeholder="•••••••••"  onChange={handleChagne} />
                <div className="" onClick={ () => setIsHidden2(!isHidden2)}>
                      {isHidden2 ?
                          <BiSolidHide className='text-xl cursor-pointer' /> : <BiSolidShow className='text-xl cursor-pointer' /> 
                      }
                </div>
               </div>
            </div> 
            <button type="submit" className="text-white bg-[#E6A4B4] p-2 rounded-lg hover:bg-[#D28A9E] hover:shadow-lg hover:text-black hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </form>
    </div>
  )
}

export default CreateNewEmployee