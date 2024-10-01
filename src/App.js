import React from 'react';
import HomePage from './Home/HomePage';
import Login from './Authentication/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ForgrtPassword from './Authentication/ForgrtPassword';
import ResetPassword from './Authentication/ResetPassword';
import OtpConform from './Authentication/OtpConform';
import DoctorMain from './Doctor/DoctorMain';
import Doctoraddmain from './Doctoradd/Doctoraddmain';
import MessageMain from './Message/MessageMain';
import UserMain from './User/UserMain';
import UserAddMain from './UserAdd/UserAddMain';


export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor" element={<DoctorMain />} />
          <Route path='/doctoradd' element={<Doctoraddmain />} />
          <Route path='/message' element={<MessageMain />} />
          <Route path='/user' element={<UserMain />} />
          <Route path='/user/adduser' element={<UserAddMain/>} />
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/forgot-password' element={<ForgrtPassword />} />
          <Route path='/otp-confirmation' element={<OtpConform />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}
