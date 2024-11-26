import React, { useState } from 'react'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/user/userSlice'
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const Login = () => {
  const[isHidden, setIsHidden] = useState(false)
  const[formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {loading} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      dispatch(loginStart())
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const result = await response.json()

      if(result.success == false){
        dispatch(loginFailure(result.message))
       return  toast.warn(result.message)
      }
      toast.success(result.message)
      dispatch(loginSuccess(result.data))
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Internal Error')
      dispatch(loginFailure("login failed"))
    }
  }
  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.id]: e.target.value}))
  }
  

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className="w-full max-w-sm p-4 bg-[#FFF8E3] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
          <form className="space-y-6">
              <h5 className="text-xl font-medium text-gray-900 ">Login</h5>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 " >Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5    outline-none" placeholder="name@company.com"  onChange={handleChange}  />
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ">
                    <div className='flex items-center justify-between'>
                    <input type={isHidden ? "password" : "text" } name="password" id="password" placeholder="••••••••"  onChange={handleChange}  className='outline-none border-none bg-inherit w-full'/>
                    <div className="" onClick={ () => setIsHidden(!isHidden)}>
                      {isHidden ?
                          <BiSolidHide className='text-xl cursor-pointer' /> : <BiSolidShow className='text-xl cursor-pointer' /> 
                      }
                    </div>
                    </div>
                  </div>
              </div>
              <div onClick={handleSubmit} className='w-full cursor-pointer flex items-center justify-center space-x-2 text-white bg-[#E6A4B4] hover:bg-[#D28A9E] hover:shadow-lg hover:text-black hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
              <button  className="outline-none border-none">{!loading ? 'Login to your account':' Loading... '} </button>
              {loading && <Loader width={"w-4"} height={"h-4"} />}
              </div>
          </form>
      </div>
    </div>
  )
}

export default Login