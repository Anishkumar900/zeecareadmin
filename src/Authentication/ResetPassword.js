import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import logo from '../Image/logoadmin.png';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}/resetpassword`, {
            password: password,
            username: location.state.username,
            ForgetPasswordToken: location.state.ForgetPasswordToken
        })
            .then((response) => {
                setLoading(false);
                toast.success('Password set successful!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                setTimeout(() => {
                    navigate('/adminlogin') 
                }, 900);
                
            })
            .catch((error) => {
                setLoading(false);
                toast.error('Password Reset Failed', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            });
        // Handle the form submission logic here
    }


    useEffect(() => {
        const { username, ForgetPasswordToken } = location.state || {};
        if (!username || !ForgetPasswordToken) {
            navigate('/adminlogin')
        }
    }, [location.state, navigate])

    return (

        <div>{

            loading ? <Spinner /> :
                <div className='flex items-center justify-center min-h-screen bg-purple-50'>
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-md'>
                        <img src={logo} alt='logo' className='w-40 mx-auto mb-6' />
                        <p className='font-bold text-3xl text-center mb-8'>Set New Password</p>
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <div>
                                <label htmlFor='password' className='block text-gray-700 text-lg'>Enter New Password:</label>
                                <div className='relative'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none'
                                        placeholder='Enter New password'
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-0 flex items-center pr-3'
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                                    </button>
                                </div>
                            </div>
                            <Link
                                to='/adminlogin'
                                className='text-blue-700 hover:underline flex justify-end'
                            >
                                Login
                            </Link>
                            <div>
                                <button
                                    type='submit'
                                    className='w-full py-3 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700'
                                >
                                    Continue
                                </button>

                            </div>
                        </form>
                    </div>
                </div>

        }
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

        </div>
    );
}
