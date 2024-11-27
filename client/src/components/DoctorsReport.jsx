import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { catchHandler, resultCheck } from '../utils/utitlityFunctions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'

const DoctorsReport = () => {
  const [reportsData, setReportsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the list of reports (array of objects)
    ;(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/doctor/report/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include'
        })

        const result = await response.json()
        resultCheck(dispatch, result)

        if (result.data) {
          setReportsData(result.data)  // Set the reports data to the state
        }
      } catch (error) {
        catchHandler(dispatch, error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [dispatch])

  // Handle form input change for each report
  const handleChange = (e, id) => {
    const { name, value } = e.target
    setReportsData(prevReports =>
      prevReports.map(report =>
        report._id === id ? { ...report, [name]: value } : report
      )
    )
  }

  // Handle form submission for each report
  const handleSubmit = async (e, id) => {
    e.preventDefault()

    const reportToUpdate = reportsData.find(report => report._id === id)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/doctor/report/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reportToUpdate),
      })

      const result = await response.json()
      const updateVerified = resultCheck(dispatch, result)

      // Optionally, you can navigate to a specific report page after update
      // if (updateVerified) {
      //   navigate(`/doctor/report/${id}`)
      // }
    } catch (error) {
      catchHandler(dispatch, error)
    }
  }

  // Handle delete request for each report
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/doctor/report/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include',
        })

        const result = await response.json()
        const deleteVerified = resultCheck(dispatch, result)

        if (deleteVerified) {
          // Remove the deleted report from the state
          setReportsData(prevReports => prevReports.filter(report => report._id !== id))
        }
      } catch (error) {
        catchHandler(dispatch, error)
      }
    }
  }

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Doctor's Reports</h2>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader width={'w-8'} height={'h-8'} />
        </div>
      ) : (
        <div className='space-y-10'>
          {reportsData.map((report, idx) => (
            <form
              key={report._id}
              onSubmit={(e) => handleSubmit(e, report._id)}
              className="space-y-4 mt-5"
            >
              {/* Display Serial Number */}
              <h3 className="text-lg font-semibold">Report {idx + 1}.</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={report.patientName}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Patient ID</label>
                  <input
                    type="text"
                    name="patientId"
                    value={report.patientId}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Age</label>
                  <input
                    type="text"
                    name="age"
                    value={report.age}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={report.gender}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Date of Visit</label>
                  <input
                    type="date"
                    name="dateOfVisit"
                    value={report.dateOfVisit}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Diagnosis</label>
                  <textarea
                    name="diagnosis"
                    value={report.diagnosis}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Treatment Plan</label>
                  <textarea
                    name="treatmentPlan"
                    value={report.treatmentPlan}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Medications</label>
                  <textarea
                    name="medications"
                    value={report.medications}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Follow-up Date</label>
                  <input
                    type="date"
                    name="followUpDate"
                    value={report.followUpDate}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Doctor's Name</label>
                  <input
                    type="text"
                    name="doctorName"
                    value={report.doctorName}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Comments</label>
                  <textarea
                    name="comments"
                    value={report.comments}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {["admin", "moderator", "doctor"].includes(currentUser.role) && (
                <div className="text-center mt-5 space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 px-4 rounded-md"
                  >
                    Save Report
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(report._id)}
                    className="bg-red-500 text-white p-2 px-4 rounded-md"
                  >
                    Delete Report
                  </button>
                </div>
              )}
            </form>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorsReport
