import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Image/logoadmin.png';
import axios from 'axios';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
        axios.post(`${process.env.REACT_APP_BASE_URL}/login`, formData)
            .then((response) => {
                setLoading(false); // Hide spinner
                // console.log(response.data.token);
                localStorage.setItem('zeecareadmin', response.data.token);
                toast.success('Login successful!', {
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
                    navigate('/')
                }, 800);
                // Handle successful login (e.g., redirect or update state)
            })
            .catch((error) => {
                setLoading(false); // Hide spinner
                // console.log(error);
                if (error.response && error.response.data.message) {
                    if (error.response.data.message === 'Invalid username') {
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
                    } else if (error.response.data.message === 'Invalid password') {
                        toast.error('Invalid password', {
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
                    } else {
                        toast.error('Something went wrong, please contact admin', {
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
                } else {
                    toast.error('Something went wrong, please try again later', {
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
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTogglePassword = () => {
        setShowPassword(prevShow => !prevShow);
    };

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex items-center justify-center min-h-screen bg-purple-50'>
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-lg'>
                        <img src={logo} alt='logo' className='w-40 mx-auto mb-6' />
                        <p className='font-bold text-3xl text-center mb-8'>Login</p>
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <div>
                                <label htmlFor='username' className='block text-gray-700 text-lg'>Username:</label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    className='w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-purple-200'
                                    placeholder='Enter your username'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='password' className='block text-gray-700 text-lg'>Password:</label>
                                <div className='flex items-center border border-gray-300 rounded-lg'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        className='w-full p-3 text-lg rounded-l-lg focus:outline-none'
                                        placeholder='Enter your password'
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={handleTogglePassword}
                                        className='p-2 text-gray-500 hover:text-gray-700'
                                    >
                                        {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
                                    </button>
                                </div>
                            </div>
                            <Link
                                to='/forgot-password'
                                className='text-blue-700 hover:underline flex justify-end'
                            >
                                Forgot Password?
                            </Link>
                            <div>
                                <button
                                    type='submit'
                                    className='w-full py-3 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700'
                                >
                                    Login
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
