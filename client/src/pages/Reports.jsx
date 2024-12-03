import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LabReports from '../components/LabReports';
import DoctorsReport from '../components/DoctorsReport';
import CreateDoctorReport from '../components/CreateDoctorReport';
import CreateLabReport from '../components/CreateLabReport';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('');
  const [buttons, setButtons] = useState([]);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    // Define the roles that can see specific tabs
    const roles = ["nurse", "admin", "doctor", "moderator", "lab_tech"];
    
    // Check if the user's role is within the allowed roles and set buttons accordingly
    if (roles.includes(currentUser.role)) {
      if (currentUser.role === "nurse") {
        setButtons(["Lab Reports", "Doctor's Report"]);
        setActiveTab("Lab Reports");
      } else if (["admin", "moderator"].includes(currentUser.role)) {
        setButtons([
          "Lab Reports",
          "Doctor's Report",
          "Create Doctor report",
          "Create Lab report"
        ]);
        setActiveTab("Lab Reports");
      } else if (currentUser.role === "doctor") {
        setButtons([
          "Doctor's Report",
          "Create Doctor report",
        ]);
        setActiveTab("Doctor's Report");
      } else if (currentUser.role === "lab_tech") {
        setButtons([
          "Lab Reports",
          "Create Lab report",
        ]);
        setActiveTab("Lab Reports");
      }
    }
  }, [currentUser.role]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Lab Reports':
        return <LabReports />;
      case "Doctor's Report":
        return <DoctorsReport />;
      case "Create Doctor report":
        return <CreateDoctorReport />;
      case "Create Lab report":
        return <CreateLabReport />;
      default:
        return <div>Please select a tab.</div>;  // Default message in case no tab is selected
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="sticky top-10 z-10 ">
        <div className='flex flex-wrap justify-start sm:justify-center'>
          <div className="inline-flex shadow-md overflow-x-auto  w-full sm:w-auto">
            {buttons.length > 0 &&
              buttons.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTabChange(item)}  // Set the active tab on click
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === item
                      ? 'text-gray-900 bg-white border border-gray-200' // Active button styles
                      : 'text-gray-500 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                  } focus:z-10 focus:text-gray-900  `}
                >
                  {item}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-5 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Reports;
