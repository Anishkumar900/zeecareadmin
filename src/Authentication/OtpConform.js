import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import logo from '../Image/logoadmin.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function OtpConform() {
    const [loading, setLoading] = useState(false);
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BASE_URL}/otpverification`, {
            otp: otp,
            username: location.state.username,
            ForgetPasswordToken: location.state.ForgetPasswordToken
        })
            .then((response) => {
                // console.log(response.data);
                setLoading(false);
                toast.success('OTP verified successfully', {
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
                    navigate('/reset-password', { state: { username: location.state.username, ForgetPasswordToken: location.state.ForgetPasswordToken } });
                }, 900);
                
            })
            .catch((error) => {
                setLoading(false);
                toast.error('Invalid OTP', {
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

        // console.log(otp);
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
                    <div className='bg-white p-12 rounded-lg shadow-lg w-full max-w-lg'>
                        <img src={logo} alt='logo' className='w-40 mx-auto mb-6' />
                        <p className='font-bold text-3xl text-center mb-8'>OTP Verification</p>
                        <p className='text-red-500'>**An OTP has been sent to the admin. Please contact the admin to verify the OTP.**</p>
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <div>
                                <label htmlFor='otp' className='block text-gray-700 text-lg'>OTP</label>
                                <input
                                    type="text"
                                    id='otp'
                                    name='otp'
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg text-lg  focus:outline-none focus:ring-purple-200'
                                    placeholder='Enter your otp'
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
    )
}
