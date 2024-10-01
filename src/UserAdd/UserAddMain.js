import React, { useEffect, useState } from 'react';
import Navbar from '../BarComponent/Navbar';
import Mobilebar from '../BarComponent/Mobilebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import UserFrom from './UserFrom';

export default function UserAddMain() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem('zeecareadmin');
        if (token) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, { token: token })
                .then((res) => {
                    if (res.data.message !== 'User is authenticated') {
                        navigate('/adminlogin')
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    navigate('/adminlogin')
                    setLoading(false);
                })
        }
        else {
            navigate('/adminlogin')
            setLoading(false);
        }
    }, [navigate])
    return (
        <div>{
            loading ?
                <Spinner /> :
                <div className='bg-blue-800 lg:flex min-h-screen '>
                    <Mobilebar />
                    <Navbar />
                    <UserFrom/>
                </div>
        }
        </div>
    )
}
