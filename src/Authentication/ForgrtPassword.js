import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Image/logoadmin.png';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgetpassword`, { username });
            // console.log(response.data); // Check the response structure
            setLoading(false);
            toast.success('Password reset OTP sent to admin email', {
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
            setTimeout(() => {
                navigate('/otp-confirmation', { state: { username: username, ForgetPasswordToken: response.data.ForgetPasswordToken } });
            }, 900);
            
        } catch (error) {
            setLoading(false);
            // console.error(error); // Log the error for debugging
            toast.error('Invalid username', {
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
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex items-center justify-center min-h-screen bg-purple-50'>
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-lg'>
                        <img src={logo} alt='logo' className='w-40 mx-auto mb-6' />
                        <p className='font-bold text-3xl text-center mb-8'>Reset Password</p>
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <div>
                                <label htmlFor='username' className='block text-gray-700 text-lg'>Username:</label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-purple-200'
                                    placeholder='Enter your username'
                                    required
                                />
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
            )}
            <ToastContainer
                position="top-center"
                autoClose={3000}
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
