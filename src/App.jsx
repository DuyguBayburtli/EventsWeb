import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import EventInfo from './pages/eventInfo/EventInfo';
import AddEvent from './pages/admin/page/AddEvent';
import UpdateEvent from './pages/admin/page/UpdateEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  
   <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>
          } />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/eventinfo/:id" element={<EventInfo />} />
        <Route path="/addevent" element={
            <ProtectedRoutesForAdmin><AddEvent /></ProtectedRoutesForAdmin>
          } />
        <Route path="/updateevent" element={
            <ProtectedRoutesForAdmin><UpdateEvent /></ProtectedRoutesForAdmin>} />
        <Route path="/*" element={<NoPage />}/>
      </Routes>
      <ToastContainer/>
    </Router>
   </MyState>
  
 
  )
}

export default App

//user

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}

//admin

export const ProtectedRoutesForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email === 'duygu.bayburtli@gmail.com') {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}