import axios from 'axios';
import React, { useEffect, useState } from 'react';
import doc from '../Image/doc.png';
import MessageOne from './MessageOne';
import Spinner from '../Spinner/Spinner';

export default function MessageDetails() {
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/message`)
            .then(response => {
                // console.log(response.data.allMessages)
                setMessage(response.data.allMessages)
                setLoading(false);
            })
            .catch(error => {
                // console.error(error);
                setLoading(false);
            });
    }, [])
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
                    <p className="font-bold">Total Message</p>
                    <p className="text-xl font-bold">{message.length}</p>
                </div>

            </div>

            {
                loading ?
                    <Spinner /> :

                    <div className='bg-white rounded-3xl p-5 mt-3'>
                        <p className='text-xl font-bold text-blue-700'>Query Message</p>
                        <div className='grid lg:grid-cols-2 gap-4 '>
                            {
                                message.map((item, index) => {
                                    return <MessageOne key={index} item={item} />
                                })
                            }
                        </div>
                    </div>
            }

        </div>
    )
}
