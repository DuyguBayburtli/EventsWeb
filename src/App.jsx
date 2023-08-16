import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import EventInfo from './pages/eventInfo/EventInfo';
import AddEvent from './pages/admin/page/AddEvent';
import UpdateEvent from './pages/admin/page/UpdateEvent';


function App() {
  return (
   <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/order" element={<Order />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/eventinfo/:id" element={<EventInfo />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/addevent" element={<AddEvent />}/>
        <Route path="/updateevent" element={< UpdateEvent/>}/>
        <Route path="/*" element={<NoPage />}/>
      </Routes>
   
    </Router>
   </MyState>
    
 
  )
}

export default App
