import React, { useState, useEffect } from 'react';
import doc from '../Image/doc.png';
import AppointmentDetails from './AppointmentDetails';
import axios from 'axios';
import { IoMdSearch } from "react-icons/io";
import Spinner from '../Spinner/Spinner';

export default function AppointmentNumber() {
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [doctorNumber,setDoctorNumber]=useState(0);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/appointment`);
                // console.log(response.data);
                setPatients(response.data);
                setLoading(false);
                setFilteredPatients(response.data); // Initialize filteredPatients with all patients
            } catch (err) {
                // console.error('Error fetching patient data:', err);
            }
        };

        fetchPatientData();
    }, []); // Run only once on component mount

    const handleUpdate = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/appointment`);
            // console.log(response.data);
            setPatients(response.data);
            setFilteredPatients(response.data); // Refresh filteredPatients with updated data
        } catch (err) {
            // console.error('Error refreshing patient data:', err);
        }
    };

    const searchPatient = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = patients.filter(patient =>
            patient.appointmentNumbar &&
            patient.appointmentNumbar.toString().includes(query)
        );
        setFilteredPatients(filtered); // Update filteredPatients based on search query
    };


    useEffect(() => {
        setLoading(true);
        const fetchDoctorNumber = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/doctornumber`, {});
                setDoctorNumber(response.data.doctor.length);
                // setDoctorDetails(response.data.doctor);
                setLoading(false);
            } catch (error) {
                setDoctorNumber('-..-');
                setLoading(false);
            }
        };

        fetchDoctorNumber();
    }, []);

    return (
        <div className=" pt-16 lg:pt-5 px-0 lg:px-5  flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden">
            {/* Profile Section */}
            <div className='grid lg:grid-cols-2 gap-2'>
                <div className="lg:flex bg-indigo-300 p-2 rounded-2xl items-center">
                    <img src={doc} alt="Doctor" className="w-32 h-32" />
                    <div className="ml-4">
                        <p className="text-white font-semibold text-xl">Hello, <samp className='text-pink-700 font-semibold'>Anish Kumar</samp></p>
                        <p className="text-black pt-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-sm text-black">Praesentium aliquid velit, dolorum saepe voluptatem perspiciatis sequi!</p>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-indigo-700 rounded-2xl p-4 text-white flex flex-col justify-center h-full">
                        <p className="font-bold">Total Appointments</p>
                        <p className="text-xl font-bold">{patients.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 text-red-700 flex flex-col justify-center h-full">
                        <p className="font-bold">Registered Doctor</p>
                        <p className="text-xl font-bold">{doctorNumber}</p>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-2xl mt-3 p-5 items-center'>
                <div className='md:flex justify-between py-2'>
                    <p className='text-xl font-bold pb-5 text-violet-800'>Appointments</p>
                    <div className='flex items-center border border-gray-300 rounded-lg p-2 bg-white'>
                        <input
                            type='text'
                            className='md:w-96 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 transition duration-300 ease-in-out'
                            placeholder='Search appointments...'
                            value={searchQuery}
                            onChange={searchPatient}
                        />
                        <IoMdSearch size={24} className='ml-2 text-gray-600' />
                    </div>
                </div>
                {
                    loading ? (
                        <Spinner />
                    ) : filteredPatients.length > 0 ? (
                        <div className='overflow-x-auto'>
                            <table className="table-auto w-full min-w-max border-collapse border border-gray-300 font-sans">
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='border border-gray-300 p-2 text-center'>Appointment Number</th>
                                        <th className='border border-gray-300 p-2 text-center'>Email</th>
                                        <th className='border border-gray-300 p-2 text-center'>Patient</th>
                                        <th className='border border-gray-300 p-2 text-center'>Date</th>
                                        <th className='border border-gray-300 p-2 text-center'>Time</th>
                                        <th className='border border-gray-300 p-2 text-center'>Doctor</th>
                                        <th className='border border-gray-300 p-2 text-center'>Department</th>
                                        <th className='border border-gray-300 p-2 text-center'>Deleted Status</th>
                                        <th className='border border-gray-300 p-2 text-center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.map((item) => (
                                        <tr key={item._id}>
                                            <AppointmentDetails
                                                appointmentNumbar={item.appointmentNumbar}
                                                patient={item.name}
                                                email={item.email}
                                                date={item.appointmentDate}
                                                time={item.appointmentTime}
                                                doctor={item.doctorName}
                                                department={item.specialty}
                                                status={item.status}
                                                deleted={item.deleted}
                                                _id={item._id}
                                                onUpdate={handleUpdate} // Pass the callback to update state
                                            />
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className='text-center text-gray-600'>No appointments found</p>
                    )
                }


            </div>
        </div>
    );
}
