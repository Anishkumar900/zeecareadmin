import React, { useEffect, useState } from 'react';
import doc from '../Image/doc.png';
import { FaUserCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserFrom() {
    const [showAdd, setShowAdd] = useState(false);
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);
    const [conformPasswordShow, setConformPasswordShow] = useState(false);
    const [fromData, setFromdata] = useState({
        username: '',
        password: '',
        conformPassword: '',
    });
    const [userall, setUser] = useState(null);
    // const [loading, setLoadind] = useState(true);


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_BASE_URL}/alluser`, {})
            .then((response) => {
                setUser(response.data);
                // setLoadind(false)
                // console.log(response.data);
            })
            .catch((error) => {
                // setLoadind(false);
                console.error(error);
            });

    },[])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromdata((prevData) => ({ ...prevData, [name]: value }));
    }
    const user = () => {
        navigate('/user')
    }

    useEffect(() => {
        const intervalid = setInterval(() => {
            setShowAdd(pre => !pre);
        }, 1000);
        return () => clearInterval(intervalid);

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fromData.password === fromData.conformPassword) {
            // console.log(fromData)
            const token = localStorage.getItem('zeecareadmin')
            axios.post(`${process.env.REACT_APP_BASE_URL}/useradd`, {
                username: fromData.username,
                password: fromData.password,
                token: token
            })
                .then((res) => {
                    // console.log(res.data)
                    toast.success('User added successfully!', {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                        transition: Bounce,
                    });
                    setTimeout(() => {
                        navigate('/user')
                    }, 1500);
                })
                .catch((err) => {
                    // console.log(err.response.data.message)
                    if (err.response.data.message === 'Username already exists') {
                        toast.error('Username already exists!', {
                            position: "top-center",
                            autoClose: 3000,
                            theme: "light",
                            transition: Bounce,
                        });
                    }
                    else {
                        if (err.response.data.message === 'User added admin only') {
                            toast.error('User add admin only!', {
                                position: "top-center",
                                autoClose: 3000,
                                theme: "light",
                                transition: Bounce,
                            });

                        }
                        else {
                            toast.error('Something want wrong!', {
                                position: "top-center",
                                autoClose: 3000,
                                theme: "light",
                                transition: Bounce,
                            });

                        }
                    }
                })

        }
        else {
            toast.error('Does not match password!', {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const toggleConformPassword = () => {
        setConformPasswordShow((prev) => !prev);
        const passwordField = document.getElementById('conformPassword');
        passwordField.type = conformPasswordShow ? 'password' : 'text';
    };
    const togglePasswordVisibility = () => {
        setPasswordShow((prev) => !prev);
    };

    return (
        <div className='pt-16 lg:pt-5 px-0 lg:px-5  flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden'>
            <div className='grid lg:grid-cols-2 gap-2'>
                <div className="lg:flex bg-indigo-300 p-2 rounded-2xl items-center">
                    <img src={doc} alt="Doctor" className="w-32 h-32" />
                    <div className="ml-4">
                        <p className="text-white font-semibold text-xl">Hello, <samp className='text-pink-700 font-semibold'>Anish Kumar</samp></p>
                        <p className="text-black pt-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-sm text-black">Praesentium aliquid velit, dolorum saepe voluptatem perspiciatis sequi!</p>
                    </div>
                </div>


                <div className="bg-white rounded-2xl p-4 text-red-700 flex flex-col justify-center h-full">
                    <div className='flex'>
                        <p className="font-bold">Total User</p><button className='my-auto ml-3' onClick={user}><FaUserCheck size={24} /></button>
                        {showAdd && <p>Show user</p>}
                    </div>

                    <p className="text-xl font-bold">{userall?userall.length-1:'_ . _'}</p>
                </div>

            </div>
            <div className='bg-white w-full mt-3 rounded-lg p-3'>
                <p className='text-xl font-bold text-blue-700'> User Create</p>

                <div className="flex justify-center items-center min-h-screen bg-gray-100">
                    <form className="bg-white md:p-8 p-4 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-6 text-center">User Create</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input type="text" className="w-full p-2 border border-purple-600 rounded focus:outline-none "
                                placeholder='Username'
                                name='username'
                                value={fromData.username}
                                onChange={handleChange}

                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <div className="flex border border-purple-600 rounded">
                                <input
                                    type={passwordShow ? 'text' : 'password'}
                                    className="w-full p-2 focus:outline-none"
                                    placeholder="Password"
                                    name="password"
                                    value={fromData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="my-auto mr-2 focus:outline-none"
                                    aria-label={passwordShow ? 'Hide password' : 'Show password'}
                                >
                                    {passwordShow ? <IoIosEye /> : <IoIosEyeOff />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Confirm Password</label>
                            <div className="flex border border-purple-600 rounded">
                                <input
                                    type={conformPasswordShow ? 'text' : 'password'}
                                    className="w-full p-2 focus:outline-none"
                                    placeholder="Confirm password"
                                    name="conformPassword"
                                    id="conformPassword"
                                    value={fromData.conformPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConformPassword}
                                    className="my-auto mr-2 focus:outline-none"
                                    aria-label={conformPasswordShow ? 'Hide password' : 'Show password'}
                                >
                                    {conformPasswordShow ? <IoIosEye /> : <IoIosEyeOff />}
                                </button>
                            </div>

                        </div>

                        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200" type='submit'>Create user</button>
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
                    </form>
                </div>



            </div>
        </div>
    )
}
