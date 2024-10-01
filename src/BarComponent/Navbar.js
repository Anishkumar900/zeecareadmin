import React from 'react';
import { IoMdHome } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const home = () => {
    navigate('/')
  }
  const logout = () => {
    localStorage.removeItem('zeecareadmin');
    navigate('/adminlogin')
  }
  const doctor = () => {
    navigate('/doctor')
  }
  const doctoradd = () => {
    navigate('/doctoradd')
  }
  const message = () => {
    navigate('/message')
  }

  const user = () => {
    navigate('/user')
  }
  return (
    <nav className='px-10 mx-auto my-28 hidden lg:block'>
      <div className='grid grid-cols-1 gap-6 fixed'>
        <button onClick={home}><IoMdHome color='white' size={32} /></button>
        <button onClick={doctor}><FaUserDoctor color='white' size={32} /></button>
        <button onClick={user}><MdAddModerator color='white' size={32} /></button>
        <button onClick={doctoradd}><IoPersonAddSharp color='white' size={32} /></button>
        <button onClick={message}><AiFillMessage color='white' size={32} /></button>
        <button onClick={logout}><BiSolidLogOut color='white' size={32} /></button>
      </div>
    </nav>
  )
}
