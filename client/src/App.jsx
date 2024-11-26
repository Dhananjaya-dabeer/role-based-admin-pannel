import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Employees from './pages/Employees'
import Reports from './pages/Reports'
import Login from './pages/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNewEmployee from './pages/CreateNewEmployee'
import Unauthorized from './pages/Unauthorized'
import AdminRoute from './utils/AdminRoute'
import EditEmployee from './pages/EditEmployee'

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  // Toggle the sidebar visibility
  };
  const handleParentClick = () => {
    if(isSidebarOpen){
      setIsSidebarOpen(false)
    }

  }

  return (
   <div className='' onClick={handleParentClick}>
     <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<NavBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>}>
            <Route index  element={<Home/>}/>
            <Route path='/employees'  element={ <Employees/>}/>
            <Route path='/reports' element={ <Reports/>}/>
            <Route path='/new/employee' element={ <AdminRoute><CreateNewEmployee/></AdminRoute>}/>
            <Route path='/edit/employee/:id' element={ <AdminRoute><EditEmployee/></AdminRoute>}/>

          </Route>
        </Route>
        <Route path='/login' element ={<Login/>} />
        <Route path='/unauthorized' element ={<Unauthorized/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
   </div>
  )
}

export default App
