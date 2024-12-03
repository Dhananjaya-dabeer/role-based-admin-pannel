import React from 'react'
import { Link } from 'react-router-dom'
import { RiUserForbidFill } from "react-icons/ri";

const Unauthorized = () => {
    
  return (
    <div className="w-screen h-screen flex items-center justify-center"> 

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  ">
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 "><RiUserForbidFill />Forbidden 403</h5>
            </div>
            <p className="mb-3 font-normal text-gray-700 ">I'm afraid you've found a page that doesn't atuhorize you. That can happen when you follow a link to something that has since been protected. Or the link was incorrect to begin with.</p>
            <Link to={"/"} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Go to home this way
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>

    </div>

  )
}

export default Unauthorized
