import React, { useState } from 'react';
import { GiOverInfinity } from 'react-icons/gi';
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar = ({toggle, isSidebarOpen}) => {

  const toggleSidebar = () => {
    toggle()
  }

  return (
    <div>
      <div className="text-center" onClick={toggleSidebar}>
        <>
          <IoMenu  className='text-xl'/>
        </>
      </div>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-52 h-screen p-4 overflow-y-auto transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-[#F5EEE6] dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 flex items-center space-x-2"><GiOverInfinity className="text-xl" /> <span>Menu</span></h5>

        <button
          type="button"
          onClick={toggleSidebar}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>


        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">

            <li>
              <span href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
            
                <Link className="ms-3" to={'/'}>Home</Link>
              </span>
            </li>
            <li>
              <span href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
            
                <Link className="ms-3" to={'/employees'}>Employees</Link>
              </span>
            </li>
            <li>
              <span href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={toggleSidebar}>
            
                <Link className="ms-3" to={'/reports'} >Reports</Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
