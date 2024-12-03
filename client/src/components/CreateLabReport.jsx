import React, { useState } from 'react';
import { catchHandler, resultCheck } from '../utils/utitlityFunctions';
import { useDispatch } from 'react-redux';

const CreateLabReport = () => {
  const [formData, setFormData] = useState({
    reportTitle: '',
    sampleId: '',
    labDate: '',
    result: '',
    technicianName: '',
    patientName: '',  
    testType: '',     
    technicianId: '', 
    labNotes: '',     
    reportStatus: '', 
    doctorName: '',    
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URI}/api/lab/report/create`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      const statement = resultCheck(dispatch, result);
      if (statement) {
        setFormData({
          reportTitle: '',
          sampleId: '',
          labDate: '',
          result: '',
          technicianName: '',
          patientName: '',  
          testType: '',     
          technicianId: '', 
          labNotes: '',     
          reportStatus: '', 
          doctorName: '',    
        });
      }
    } catch (error) {
      catchHandler(dispatch, error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {/* Report Title */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="reportTitle"
          id="report_title"
          value={formData.reportTitle}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="report_title"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Report Title
        </label>
      </div>

      {/* Sample ID */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="sampleId"
          id="sample_id"
          value={formData.sampleId}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="sample_id"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Sample ID
        </label>
      </div>

      {/* Lab Date */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="date"
          name="labDate"
          id="lab_date"
          value={formData.labDate}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        />
        <label
          htmlFor="lab_date"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Lab Date
        </label>
      </div>

      {/* Result */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="result"
          id="result"
          value={formData.result}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="result"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Result
        </label>
      </div>

      {/* Technician Name */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="technicianName"
          id="technician_name"
          value={formData.technicianName}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="technician_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Technician Name
        </label>
      </div>

      {/* Patient Name */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="patientName"
          id="patient_name"
          value={formData.patientName}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="patient_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Patient Name
        </label>
      </div>

      {/* Test Type */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="testType"
          id="test_type"
          value={formData.testType}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="test_type"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Test Type
        </label>
      </div>

      {/* Technician ID */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="technicianId"
          id="technician_id"
          value={formData.technicianId}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="technician_id"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Technician ID
        </label>
      </div>

      {/* Lab Notes */}
      <div className="relative z-0 w-full mb-5 group">
        <textarea
          name="labNotes"
          id="lab_notes"
          value={formData.labNotes}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="lab_notes"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Lab Notes
        </label>
      </div>

      {/* Report Status */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="reportStatus"
          id="report_status"
          value={formData.reportStatus}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="report_status"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Report Status
        </label>
      </div>

      {/* Doctor Name */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="doctorName"
          id="doctor_name"
          value={formData.doctorName}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="doctor_name"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Doctor Name
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#E6A4B4] p-2 rounded-md text-white hover:bg-[#D28A9E] hover:shadow-lg hover:text-black hover:scale-105"
      >
        Create Report
      </button>
    </form>
  );
};

export default CreateLabReport;
