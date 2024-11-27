import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { catchHandler, resultCheck } from '../utils/utitlityFunctions'
import Loader from '../components/Loader'

const LabReports = () => {
  const [labReportsData, setLabReportsData] = useState([])  // Store the lab reports data
  const [isLoading, setIsLoading] = useState(true)  // Loading state
  const dispatch = useDispatch()  // Redux dispatch
  const { currentUser } = useSelector(state => state.user)  // Current logged in user

  useEffect(() => {
    // Fetch lab reports data from the backend
    ;(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/lab/report/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
          },
          credentials: 'include'
        })

        const result = await response.json()
        resultCheck(dispatch, result)

        if (result.data) {
          setLabReportsData(result.data)  
        }
      } catch (error) {
        catchHandler(dispatch, error)
      } finally {
        setIsLoading(false)  
      }
    })()
  }, [])

  // Handle form input change for each lab report
  const handleChange = (e, id) => {
    const { name, value } = e.target
    setLabReportsData(prevReports =>
      prevReports.map(report =>
        report._id === id ? { ...report, [name]: value } : report
      )
    )
  }

  // Handle form submission for each lab report
  const handleSubmit = async (e, id) => {
    e.preventDefault()

    const labReportToUpdate = labReportsData.find(report => report._id === id)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/lab/report/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        credentials: 'include',
        body: JSON.stringify(labReportToUpdate),  // Send the updated lab report data
      })

      const result = await response.json()
      const updateVerified = resultCheck(dispatch, result)

      // You can navigate to a specific page after successful update if needed
      // if (updateVerified) {
      //   navigate(`/lab/report/${id}`)  // Navigate to the updated report details page
      // }
    } catch (error) {
      catchHandler(dispatch, error)
    }
  }

  // Handle delete request for each lab report
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lab report?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/lab/report/delete/${id}`, {
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
          setLabReportsData(prevReports => prevReports.filter(report => report._id !== id))
        }
      } catch (error) {
        catchHandler(dispatch, error)
      }
    }
  }

  return (
    <div>
      <h2 className="text-center text-xl font-bold">Lab Reports</h2>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader width={'w-8'} height={'h-8'} />
        </div>
      ) : (
        <div className='space-y-10'>
          {labReportsData.map((report, idx) => (
            <form
              key={report._id}
              onSubmit={(e) => handleSubmit(e, report._id)}
              className="space-y-4 mt-5"
            >
              {/* Display Serial Number */}
              <h3 className="text-lg font-semibold">Lab Report {idx + 1}.</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block">Report Title</label>
                  <input
                    type="text"
                    name="reportTitle"
                    value={report.reportTitle}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Sample ID</label>
                  <input
                    type="text"
                    name="sampleId"
                    value={report.sampleId}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Lab Date</label>
                  <input
                    type="date"
                    name="labDate"
                    value={report.labDate}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Result</label>
                  <textarea
                    name="result"
                    value={report.result}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Technician Name</label>
                  <input
                    type="text"
                    name="technicianName"
                    value={report.technicianName}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
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
                  <label className="block">Test Type</label>
                  <input
                    type="text"
                    name="testType"
                    value={report.testType}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Technician ID</label>
                  <input
                    type="text"
                    name="technicianId"
                    value={report.technicianId}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Lab Notes</label>
                  <textarea
                    name="labNotes"
                    value={report.labNotes}
                    onChange={(e) => handleChange(e, report._id)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block">Report Status</label>
                  <input
                    type="text"
                    name="reportStatus"
                    value={report.reportStatus}
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
              </div>

              {["admin", "moderator", "lab_tech"].includes(currentUser.role) && (
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

export default LabReports
