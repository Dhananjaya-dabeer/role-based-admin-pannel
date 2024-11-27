import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { catchHandler, resultCheck } from '../utils/utitlityFunctions'
import { useDispatch } from 'react-redux'
import { data } from 'react-router-dom'


ChartJS.register(ArcElement, Tooltip, Legend)

const Home = () => {
  const [employeeData, setEmployeeData] = useState({
    labels: ['Doctor', 'Nurse', 'Admin', 'Lab-Tech', 'Moderator'], 
    datasets: [
      {
        label: 'Employee Distribution',
        data: [],
        backgroundColor: ['#FFB6C1', '#FF7F50', '#87CEEB', '#98FB98', '#FFD700'],
      },
    ],
  })
  const dispatch = useDispatch()
  const[reportData, setReportData] = useState({
    labels: ['Lab Reports', 'Doctor Reports'],
    datasets: [
      {
        label: 'Report Types Distribution',
        data: [],
        backgroundColor: ['#FF6347', '#FFD700'],
      },
    ],
  })

  useEffect(() => {
    ;(async() => {
      try {
        const labResponse = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/lab/report/home`, {
          method: "GET",
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
        })
        const labResult = await labResponse.json()
        const labStatus = resultCheck(dispatch, labResult)
        const doctorResponse = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/doctor/report/home`, {
          method: "GET",
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
        })
        const doctorResult = await doctorResponse.json()
        const doctorStatus = resultCheck(dispatch, doctorResult)
        if(labStatus && doctorStatus){
          setReportData(prev => (
            {
              ...prev, 
              datasets: [
                {
                  ...prev.datasets[0],
                  data: [labResult.data, doctorResult.data]
                }
              ]
            }
          ))
        }

        try {
          const employeeResponse = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/get/list`, {
            method: "GET", 
            headers: {
              "Content-Type": "Application/json"
            },
            credentials: 'include'
          })
          const employeeResult = await employeeResponse.json()
          const employeestatus = resultCheck(dispatch, employeeResult)
          if(employeestatus){
            const copyOfResult = [...employeeResult.data]
            const doctors = copyOfResult.filter((item) => item.role === "doctor")
            const admin = copyOfResult.filter((item) => item.role === "admin")
            const nurse = copyOfResult.filter((item) => item.role === "nurse")
            const moderator = copyOfResult.filter((item) => item.role === "moderator")
            const lab_tech = copyOfResult.filter((item) => item.role === "lab_tech")
            setEmployeeData(prev => ({
              ...prev,
              datasets: [
              {...prev.datasets[0],
               data: [doctors.length, admin.length, nurse.length, moderator.length, lab_tech.length]
              }
              ]
              
            }))
          }
        } catch (error) {
          catchHandler(dispatch, error)
        }finally{
          setIsLoading(false)
        }
      } catch (error) {
        catchHandler(dispatch, error)
      }
    })()

  }, [])

  console.log(employeeData)

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-center text-xl font-bold">Dashboard</h2>

     <div className='flex justify-evenly items-center flex-row w-screen'>
     <div className="my-10">
        <h3 className="text-center text-lg font-semibold mb-4">Employee Distribution</h3>
        <div className="w-full flex justify-center">
          {employeeData && <Pie data={employeeData} />}
        </div>
      </div>

     
      <div className="my-10">
        <h3 className="text-center text-lg font-semibold mb-4">Report Types Distribution</h3>
        <div className="w-full flex justify-center">
          <Pie data={reportData} />
        </div>
      </div>
     </div>
    </div>
  )
}

export default Home
