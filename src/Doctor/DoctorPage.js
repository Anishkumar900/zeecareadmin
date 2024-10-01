import React, { useEffect, useState } from 'react';
import doc from '../Image/doc.png';
import { HiUserAdd } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OneDoctorCart from './OneDoctorCart';
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DoctorPage() {
    const navigate = useNavigate();
    const [showAddDoctor, setShowAddDoctor] = useState(false);
    const [doctorNumber, setDoctorNumber] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const doctoradd = () => {
        navigate('/doctoradd');
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowAddDoctor(prev => !prev);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchDoctorNumber = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/doctornumber`, {});
                setDoctorNumber(response.data.doctor.length);
                setDoctorDetails(response.data.doctor);
                setLoading(false);
            } catch (error) {
                setDoctorNumber('-..-');
                setLoading(false);
            }
        };

        fetchDoctorNumber();
    }, []);

    const deleteDoctor = async (id) => {
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/deletdoctor`, { _id: id });
            setDoctorDetails(prev => {
                const updatedDetails = prev.filter(doctor => doctor._id !== id);
                setDoctorNumber(updatedDetails.length); // Update doctor number
                return updatedDetails;
            });
            setLoading(false);
            toast.success('Doctor Deleted Successfully!', {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
            setLoading(false);
            toast.error('Doctor Not Deleted!', {
                position: "top-center",
                autoClose: 3000,
            });
        }
    }

    return (
        <div className='pt-16 lg:pt-5 px-0 lg:px-5 flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden'>
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
                        <p className="font-bold">Registered Doctor</p>
                        <button className='ml-3' onClick={doctoradd} onMouseEnter={() => setShowAddDoctor(!showAddDoctor)} onMouseLeave={() => setShowAddDoctor(!showAddDoctor)}>
                            <HiUserAdd size={28} />
                        </button>
                        {showAddDoctor && <p>Add Doctor</p>}
                    </div>
                    <p className="text-xl font-bold">{doctorNumber}</p>
                </div>
            </div>

            <div className='bg-white lg:my-4 my-2 rounded-3xl lg:p-5 p-2'>
                <p className='text-xl font-semibold text-blue-700'>Doctor Details</p>
                {
                    loading ? <Spinner /> :
                        doctorNumber === 0 ? <p className='text-center mt-4 text-gray-500 font-bold'>No doctors found.</p> :
                            doctorDetails.map((item, index) => {
                                return <OneDoctorCart
                                    key={index}
                                    _id={item._id}
                                    doctorName={item.doctorName}
                                    specialty={item.specialty}
                                    phoneNumber={item.phoneNumber}
                                    email={item.email}
                                    doctorExperiences={item.doctorExperiences}
                                    doctorDegree={item.doctorDegree}
                                    aboutDoctor={item.aboutDoctor}
                                    onDelete={deleteDoctor}  // Pass delete function
                                />
                            })
                }
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}

















































// import React, { useEffect, useState } from 'react';
// import doc from '../Image/doc.png';
// import { HiUserAdd } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import OneDoctorCart from './OneDoctorCart';
// import Spinner from '../Spinner/Spinner';

// export default function DoctorPage() {
//     const navigate = useNavigate();
//     const [showAddDoctor, setShowAddDoctor] = useState(false);
//     const [doctorNumber, setDoctorNumber] = useState(null);
//     const [doctorDetails, setDoctorDetails] = useState([]);
//     const [loading, setLoading] = useState(false);


//     const doctoradd = () => {
//         navigate('/doctoradd')
//     }

//     useEffect(() => {

//         const intervalId = setInterval(() => {
//             setShowAddDoctor(prev => !prev)
//         }, 1000);

//         return () => clearInterval(intervalId);
//     }, [])

//     useEffect(() => {
//         setLoading(true);
//         const fetchDoctorNumber = async () => {
//             try {
//                 const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/doctornumber`, {});
//                 setDoctorNumber(response.data.doctor.length);
//                 setDoctorDetails(response.data.doctor);
//                 setLoading(false);
//                 // console.log(response.data.doctor); // Log the fetched data
//             } catch (error) {
//                 // console.error('Error fetching doctor number:', error);
//                 setDoctorNumber('-..-')
//                 setLoading(false);
//             }
//         };

//         fetchDoctorNumber();
//     }, []);


//     return (
//         <div className='pt-20 lg:pt-5 px-0 lg:px-5  flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden '>
//             <div className='grid grid-cols-2 gap-2'>
//                 <div className="flex bg-indigo-300 p-2 rounded-2xl items-center">
//                     <img src={doc} alt="Doctor" className="w-32 h-32" />
//                     <div className="ml-4">
//                         <p className="text-white font-semibold text-xl">Hello, <samp className='text-pink-700 font-semibold'>Anish Kumar</samp></p>
//                         <p className="text-black pt-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
//                         <p className="text-sm text-black">Praesentium aliquid velit, dolorum saepe voluptatem perspiciatis sequi!</p>
//                     </div>
//                 </div>
//                 <div className="bg-white rounded-2xl p-4 text-red-700 flex flex-col justify-center h-full">
//                     <div className=' flex'><p className="font-bold ">Registered Doctor</p>
//                         <button className='ml-3' onClick={doctoradd} onMouseEnter={() => setShowAddDoctor(!showAddDoctor)} onMouseLeave={() => setShowAddDoctor(!showAddDoctor)}><HiUserAdd size={28} /></button>{showAddDoctor && <p>Add Doctor</p>} </div>
//                     <p className="text-xl font-bold">{doctorNumber}</p>
//                 </div>
//             </div>

//             <div className='bg-white my-4 rounded-3xl p-5'>
//                 <p className='text-xl font-semibold text-blue-700'>Doctor Details</p>
//                 {

//                     loading ? <Spinner /> :

//                         doctorNumber === 0 ? <p className='text-center mt-4 text-gray-500 font-bold'>No doctors found.</p> :
//                             doctorDetails.map((item, index) => {
//                                 return <OneDoctorCart
//                                     key={index}
//                                     _id={item._id}
//                                     doctorName={item.doctorName}
//                                     specialty={item.specialty}
//                                     phoneNumber={item.phoneNumber}
//                                     email={item.email}
//                                     doctorExperiences={item.doctorExperiences}
//                                     doctorDegree={item.doctorDegree} // Ensure this is the correct object
//                                     aboutDoctor={item.aboutDoctor}
//                                 />
//                             })
//                 }

//             </div>
//         </div>
//     )
// }
