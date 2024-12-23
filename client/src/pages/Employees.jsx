import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { catchHandler, resultCheck } from '../utils/utitlityFunctions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/get/list`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json"
          },
          credentials: 'include'
        })
        const result = await response.json()
        resultCheck(dispatch, result)
        setEmployeeData(result.data)
      } catch (error) {
        catchHandler(dispatch, error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/get/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json"
        },
        credentials: 'include'
      })
      const result = await response.json()
      const deleteVerified = resultCheck(dispatch, result)
      if (deleteVerified) {
        const data = [...employeeData]
        const updatedData = data.filter((employee) => employee._id !== id)
        setEmployeeData(updatedData)
      }
    } catch (error) {
      catchHandler(dispatch, error)
    }
  }

  return (
    <div className="container mx-auto p-5">
  
      <div className="flex justify-center mb-5">
        {currentUser.role === "admin" && (
          <button
            onClick={() => navigate('/new/employee')}
            className='bg-[#E6A4B4] p-2 rounded-md text-white hover:bg-[#D28A9E] hover:shadow-lg hover:text-black hover:scale-105'
          >
            Create new Employee
          </button>
        )}
      </div>

 
      <div className='mt-5 space-y-4'>
        {!isLoading ? (
          employeeData?.map((user) => (
            <div
              className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 text-sm flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4"
              key={user._id}
            >
              
              <div className="w-full sm:w-2/3">
                <div className="flex space-x-2">
                  <p className='font-medium'>Employee Id:</p>
                  <p className='truncate max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl'>{user._id}</p>
                </div>
                <div className="flex space-x-2">
                  <p className='font-medium'>Username:</p>
                  <p>{user.username}</p>
                </div>
                <div className="flex space-x-2">
                  <p className='font-medium'>Role:</p>
                  <p>{user.role}</p>
                </div>
                <div className="flex space-x-2">
                  <p className='font-medium'>Email:</p>
                  <p>{user.email}</p>
                </div>
              </div>

              {currentUser.role === "admin" && (
                <div className="space-x-4 flex justify-center sm:justify-end w-full sm:w-auto">
                  <Link to={`/edit/employee/${user._id}`} className='bg-green-300 p-2 px-4 rounded-md'>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className='bg-red-400 p-2 px-4 rounded-md'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Loader width={"w-8"} height={"h-8"} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Employees
