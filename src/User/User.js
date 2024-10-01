import React, { useEffect, useState } from 'react';
import doc from '../Image/doc.png';
import { HiUserAdd } from "react-icons/hi";
import Userdetailsone from './Userdetailsone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function UserPage() {
    const [showAdd, setShowAdd] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const adduser = () => {
        navigate('/user/adduser');
    };

    const fetchUsers = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/alluser`, {})
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowAdd(pre => !pre);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='pt-16 lg:pt-5 px-0 lg:px-5 flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden'>
            <div className='grid lg:grid-cols-2 gap-2'>
                <div className="lg:flex bg-indigo-300 p-2 rounded-2xl items-center">
                    <img src={doc} alt="Doctor" className="w-32 h-32" />
                    <div className="ml-4">
                        <p className="text-white font-semibold text-xl">Hello, <span className='text-pink-700 font-semibold'>Anish Kumar</span></p>
                        <p className="text-black pt-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-sm text-black">Praesentium aliquid velit, dolorum saepe voluptatem perspiciatis sequi!</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 text-red-700 flex flex-col justify-center h-full">
                    <div className='flex'>
                        <p className="font-bold">Total User</p><button className='my-auto ml-3' onClick={adduser}><HiUserAdd size={24} /></button>
                        {showAdd && <p>Add user</p>}
                    </div>

                    <p className="text-xl font-bold">{user.length-1}</p>
                </div>
            </div>

            <div className='bg-white w-full mt-3 rounded-lg p-3'>
                <p className='text-xl font-bold text-blue-700'> User Details</p>
                {
                    loading ? <Spinner /> :
                        <div className='grid lg:grid-cols-2 gap-5'>
                            {
                                user.map((item, index) => (
                                    item.status === 'inactive' &&
                                    <Userdetailsone 
                                        key={index}
                                        username={item.username}
                                        updated_at={item.updated_at}
                                        created_at={item.created_at}
                                        status={item.status}
                                        _id={item._id}
                                        refreshUsers={fetchUsers} // Pass the refresh function
                                    />
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    );
}
