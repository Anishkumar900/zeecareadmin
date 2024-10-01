// import React, { useEffect, useState } from 'react';
// import doc from '../Image/doc.png';
// import { FaUserDoctor } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';
// import './DoctorFrom.css';
// import axios from 'axios';
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Spinner from '../Spinner/Spinner';



// const degrees = ['MBBS', 'BDS', 'BAMS', 'BUMS', 'BHMS', 'BYNS', 'B.V.Sc & AH', 'MD', 'MS', 'DNB', 'DM', 'M.Ch'];
// const specialties = ['Family Medicine', 'Internal Medicine', 'Pediatrics', 'Obstetrics and Gynecology', 'Surgery', 'Dermatology', 'Psychiatry', 'Anesthesiology', 'Radiology', 'Emergency Medicine', 'Orthopedic Surgery', 'Ophthalmology', 'Urology', 'Otolaryngology', 'Pathology', 'Neurology', 'Oncology', 'Geriatrics', 'Pulmonology', 'Rheumatology', 'Endocrinology', 'Infectious Disease', 'Allergy and Immunology', 'Sports Medicine', 'Transplant Surgery', 'Cardiology', 'Hematology', 'Nuclear Medicine', 'Physical Medicine and Rehabilitation', 'Sleep Medicine', 'Medical Genetics', 'Clinical Pharmacology', 'Palliative Care', 'Preventive Medicine', 'Occupational Medicine', 'Pain Medicine', 'Addiction Medicine', 'Emergency Medical Services', 'Gastroenterology', 'Nephrology', 'Plastic Surgery', 'Vascular Surgery', 'Thoracic Surgery', 'Colorectal Surgery', 'Pediatric Surgery', 'Neurosurgery', 'Interventional Radiology', 'Wound Care', 'Dermatopathology', 'Forensic Medicine', 'Clinical Psychology', 'Health Informatics', 'Nurse Practitioner', 'Physician Assistant', 'Public Health', 'Family Planning', 'Sexual Health', 'Pediatric Cardiology', 'Pediatric Neurology', 'Child and Adolescent Psychiatry', 'Geriatric Psychiatry', 'Adult Psychiatry', 'Reproductive Endocrinology', 'Fertility Medicine', 'Genetic Counseling', 'Medical Education', 'Health Administration', 'Clinical Trials', 'Patient Safety', 'Quality Improvement', 'Clinical Research', 'Biomedical Engineering', 'Healthcare Consulting', 'Telemedicine', 'Chiropractic', 'Acupuncture', 'Holistic Medicine', 'Nutrition', 'Integrative Medicine', 'Functional Medicine', 'Mind-Body Medicine', 'Bioethics', 'Environmental Health', 'Social Medicine'];

// export default function DoctorFrom() {
//     const navigate = useNavigate();
//     const [showDoctor, setShowDoctor] = useState(true);
//     const [doctorNumber, setDoctorNumber] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const optionsDegrees = degrees.map(degree => ({ value: degree, label: degree }));
//     const optionsSpecialties = specialties.map(specialty => ({ value: specialty, label: specialty }));


//     const handleDegreeChange = (selectedOption) => {
//         setFormData(pre => ({
//             ...pre,
//             doctorDegree: selectedOption
//         }))
//     };

//     const handleSpecialtyChange = (selectedOption) => {
//         setFormData(pre => ({
//             ...pre,
//             specialty: selectedOption
//         }))
//     };

//     const [formData, setFormData] = useState({
//         doctorName: '',
//         doctorDegree: '',
//         doctorExperiences: '',
//         specialty: '',
//         aboutDoctor: '',
//         phoneNumber: '',
//         email: '',
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         const formattedValue = name === 'doctorName'
//             ? value.startsWith('Dr. ')
//                 ? value
//                 : "Dr. " + value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
//             : value;

//         setFormData(prev => ({
//             ...prev,
//             [name]: formattedValue
//         }));
//     };




//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         if (formData.doctorExperiences >= 0) {
//             axios.post(`${process.env.REACT_APP_BASE_URL}/adddoctor`, formData)
//                 .then((response) => {
//                     setLoading(false);
//                     // console.log(response.data)
//                     toast.success('Doctor Added Successfully!', {
//                         position: "top-center",
//                         autoClose: 3000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                         transition: Bounce,
//                     });
//                     setFormData({
//                         doctorName: '',
//                         doctorDegree: '',
//                         doctorExperiences: '',
//                         specialty: '',
//                         aboutDoctor: '',
//                         phoneNumber: '',
//                         email: '',
//                     });
//                 })
//                 .catch((error) => {
//                     setLoading(false);
//                     // console.error(error);
//                     if (error.response.data.message === 'doctorDetails validation failed: phoneNumber: Please enter a valid phone number') {
//                         toast.error('Please enter a valid phone number !', {
//                             position: "top-center",
//                             autoClose: 3000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "light",
//                             transition: Bounce,
//                         });
//                     }
//                     else {
//                         toast.error('Enter a valid input !', {
//                             position: "top-center",
//                             autoClose: 3000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "light",
//                             transition: Bounce,
//                         });
//                     }
//                 });
//         }
//         else {
//             setLoading(false);
//             toast.error('Enter Valid Experience !', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//                 transition: Bounce,
//             });
//         }


//     };







//     const doctor = () => {
//         navigate('/doctor');
//     };

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setShowDoctor(prev => !prev); // Toggle the state
//         }, 1000);

//         return () => clearInterval(intervalId);
//     }, []);


//     useEffect(() => {
//         setLoading(true);
//         const fetchDoctorNumber = async () => {
//             try {
//                 const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/doctornumber`, {});
//                 setLoading(false);
//                 setDoctorNumber(response.data.doctor.length);
//                 // console.log(response.data.doctor.length); // Log the fetched data
//             } catch (error) {
//                 // console.error('Error fetching doctor number:', error);
//                 setDoctorNumber('-..-');
//                 setLoading(false);
//             }
//         };

//         fetchDoctorNumber();
//     }, []);

//     return (


//         <div className='pt-20 lg:pt-5 px-0 lg:px-5 flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden'>


//             {
//                 loading ? <Spinner /> :
//                     <div>
//                         <div className='grid lg:grid-cols-2 gap-2'>
//                             <div className="flex bg-indigo-300 p-2 rounded-2xl items-center">
//                                 <img src={doc} alt="Doctor" className="w-32 h-32" />
//                                 <div className="ml-4">
//                                     <p className="text-white font-semibold text-xl">Hello, <samp className='text-pink-700 font-semibold'>Anish Kumar</samp></p>
//                                     <p className="text-black pt-2 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
//                                     <p className="text-sm text-black">Praesentium aliquid velit, dolorum saepe voluptatem perspiciatis sequi!</p>
//                                 </div>
//                             </div>

//                             {/* Statistics Section */}
//                             <div className="bg-white rounded-2xl p-4 text-red-700 flex flex-col justify-center h-full">
//                                 <div className='flex'>
//                                     <p className="font-bold mr-4">Registered Doctor</p><button className='my-auto' onClick={doctor}><FaUserDoctor size={24} /></button>{showDoctor && <p>Show Doctor</p>}
//                                 </div>
//                                 <p className="text-xl font-bold">{doctorNumber}</p>
//                             </div>
//                         </div>

//                         <div className='bg-white mt-4 rounded-3xl py-5 px-16'>
//                             <p className='text-xl font-bold text-blue-700 mb-4'>Add Doctor</p>
//                             <form onSubmit={handleSubmit}>
//                                 <div className='grid grid-cols-2 gap-20'>
//                                     <div className="mt-3 relative">
//                                         <label className="block font-medium text-gray-700 mb-1 ml-2">Doctor Name</label>
//                                         <input
//                                             type="text"
//                                             name="doctorName"
//                                             id="doctorName"
//                                             value={formData.doctorName}
//                                             onChange={handleChange}
//                                             className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
//                                             placeholder="Doctor Name"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="mt-3 relative">
//                                         <label className="block font-medium text-gray-700 mb-1 ml-2">Highest Degree</label>
//                                         <Select
//                                             options={optionsDegrees}
//                                             // value={selectedDegree}
//                                             value={formData.doctorDegree}
//                                             onChange={handleDegreeChange}
//                                             placeholder="Select Degree"
//                                             className="basic-single border-purple-500"
//                                             classNamePrefix="select"
//                                             required
//                                             styles={{
//                                                 control: (provided) => ({
//                                                     ...provided,
//                                                     borderColor: 'purple',
//                                                     boxShadow: 'none',
//                                                     '&:hover': {
//                                                         borderColor: 'darkviolet',
//                                                     },
//                                                 }),
//                                                 menu: (provided) => ({
//                                                     ...provided,
//                                                     zIndex: 9999,
//                                                 }),
//                                             }}
//                                         />
//                                     </div>
//                                 </div>



//                                 <div className='grid grid-cols-2 gap-20'>
//                                     <div className="mt-3 relative">
//                                         <label className="block font-medium text-gray-700 mb-1 ml-2">Phone Number</label>
//                                         <input
//                                             type="number"
//                                             name="phoneNumber"
//                                             id="phoneNumber"
//                                             value={formData.phoneNumber}
//                                             onChange={handleChange}
//                                             className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
//                                             placeholder="Phone Number"
//                                             required
//                                         />
//                                     </div>


//                                     <div className="mt-3 relative">
//                                         <label className="block font-medium text-gray-700 mb-1 ml-2">Email</label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             id="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
//                                             placeholder="Email"
//                                             required
//                                         />
//                                     </div>


//                                 </div>




//                                 <div className='grid grid-cols-2 gap-20 mt-4'>
//                                     <div className="mt-3 relative">
//                                         <label className="block font-medium text-gray-700 mb-1 ml-2">Experiences</label>
//                                         <input
//                                             type="number"
//                                             name="doctorExperiences"
//                                             id="experiences"
//                                             value={formData.doctorExperiences}
//                                             onChange={handleChange}
//                                             className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
//                                             placeholder="Experiences"
//                                             required
//                                         />
//                                     </div>

//                                     <div className="mt-3 relative">
//                                         <label className="block font-medium text-gray-700 mb-1 ml-2">Specialty</label>
//                                         <Select
//                                             options={optionsSpecialties}
//                                             value={formData.specialty}
//                                             onChange={handleSpecialtyChange}
//                                             placeholder="Select Specialty"
//                                             className="basic-single border-purple-500"
//                                             classNamePrefix="select"
//                                             required
//                                             styles={{
//                                                 control: (provided) => ({
//                                                     ...provided,
//                                                     borderColor: 'purple',
//                                                     boxShadow: 'none',
//                                                     '&:hover': {
//                                                         borderColor: 'darkviolet',
//                                                     },
//                                                 }),
//                                                 menu: (provided) => ({
//                                                     ...provided,
//                                                     zIndex: 9999,
//                                                 }),
//                                             }}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className='mt-4'>
//                                     <label className="block font-medium text-gray-700 mb-1 ml-2">About the Doctor</label>
//                                     <textarea
//                                         name="aboutDoctor"
//                                         id="aboutDoctor"
//                                         value={formData.aboutDoctor}
//                                         onChange={handleChange}
//                                         className='block w-full border border-purple-500 p-2 focus:outline-none rounded-md'
//                                         placeholder='Write about the doctor...'
//                                         required
//                                     />
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className='my-6 bg-blue-600 hover:bg-blue-700 text-white p-3 font-semibold rounded-xl'
//                                 >
//                                     Add Doctor
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//             }



//             <ToastContainer
//                 position="top-center"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 transition={Bounce}
//             />
//         </div>
//     );
// }








import React, { useEffect, useState } from 'react';
import doc from '../Image/doc.png';
import { FaUserDoctor } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './DoctorFrom.css';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Spinner/Spinner';

const degrees = ['MBBS', 'BDS', 'BAMS', 'BUMS', 'BHMS', 'BYNS', 'B.V.Sc & AH', 'MD', 'MS', 'DNB', 'DM', 'M.Ch'];
const specialties = ['Family Medicine', 'Internal Medicine', 'Pediatrics', 'Obstetrics and Gynecology', 'Surgery', 'Dermatology', 'Psychiatry', 'Anesthesiology', 'Radiology', 'Emergency Medicine', 'Orthopedic Surgery', 'Ophthalmology', 'Urology', 'Otolaryngology', 'Pathology', 'Neurology', 'Oncology', 'Geriatrics', 'Pulmonology', 'Rheumatology', 'Endocrinology', 'Infectious Disease', 'Allergy and Immunology', 'Sports Medicine', 'Transplant Surgery', 'Cardiology', 'Hematology', 'Nuclear Medicine', 'Physical Medicine and Rehabilitation', 'Sleep Medicine', 'Medical Genetics', 'Clinical Pharmacology', 'Palliative Care', 'Preventive Medicine', 'Occupational Medicine', 'Pain Medicine', 'Addiction Medicine', 'Emergency Medical Services', 'Gastroenterology', 'Nephrology', 'Plastic Surgery', 'Vascular Surgery', 'Thoracic Surgery', 'Colorectal Surgery', 'Pediatric Surgery', 'Neurosurgery', 'Interventional Radiology', 'Wound Care', 'Dermatopathology', 'Forensic Medicine', 'Clinical Psychology', 'Health Informatics', 'Nurse Practitioner', 'Physician Assistant', 'Public Health', 'Family Planning', 'Sexual Health', 'Pediatric Cardiology', 'Pediatric Neurology', 'Child and Adolescent Psychiatry', 'Geriatric Psychiatry', 'Adult Psychiatry', 'Reproductive Endocrinology', 'Fertility Medicine', 'Genetic Counseling', 'Medical Education', 'Health Administration', 'Clinical Trials', 'Patient Safety', 'Quality Improvement', 'Clinical Research', 'Biomedical Engineering', 'Healthcare Consulting', 'Telemedicine', 'Chiropractic', 'Acupuncture', 'Holistic Medicine', 'Nutrition', 'Integrative Medicine', 'Functional Medicine', 'Mind-Body Medicine', 'Bioethics', 'Environmental Health', 'Social Medicine'];

export default function DoctorFrom() {
    const navigate = useNavigate();
    const [showDoctor, setShowDoctor] = useState(true);
    const [doctorNumber, setDoctorNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]); // State to hold doctors data

    const optionsDegrees = degrees.map(degree => ({ value: degree, label: degree }));
    const optionsSpecialties = specialties.map(specialty => ({ value: specialty, label: specialty }));

    const [formData, setFormData] = useState({
        doctorName: '',
        doctorDegree: '',
        doctorExperiences: '',
        specialty: '',
        aboutDoctor: '',
        phoneNumber: '',
        email: '',
    });

    const handleDegreeChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, doctorDegree: selectedOption }));
    };

    const handleSpecialtyChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, specialty: selectedOption }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name === 'doctorName'
            ? value.startsWith('Dr. ')
                ? value
                : "Dr. " + value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            : value;

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.doctorExperiences >= 0) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/adddoctor`, formData)
                .then((response) => {
                    setLoading(false);
                    setDoctors(prev => [...prev, response.data]); // Update doctors state with new data
                    setDoctorNumber(prev => prev + 1); // Increment doctor count
                    toast.success('Doctor Added Successfully!', {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                        transition: Bounce,
                    });
                    setFormData({
                        doctorName: '',
                        doctorDegree: '',
                        doctorExperiences: '',
                        specialty: '',
                        aboutDoctor: '',
                        phoneNumber: '',
                        email: '',
                    });
                })
                .catch((error) => {
                    setLoading(false);
                    const errorMessage = error.response?.data?.message || 'Enter a valid input !';
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                        transition: Bounce,
                    });
                });
        }
        else {
            setLoading(false)
            toast.error("Please Enter Correct Doctor Experiences!", {
                position: "top-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
        }
        setLoading(false);

    };

    useEffect(() => {
        const fetchDoctorNumber = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/doctornumber`, {});
                setDoctorNumber(response.data.doctor.length);
                setDoctors(response.data.doctor); // Store the initial doctors' data
            } catch (error) {
                setDoctorNumber('-..-');
            }
        };

        fetchDoctorNumber();
    }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowDoctor(prev => !prev); // Toggle the state
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='pt-16 lg:pt-5 px-0 lg:px-5 flex flex-col bg-zinc-300 lg:rounded-l-3xl rounded-t-3xl lg:rounded-r-none p-5 min-h-screen w-full overflow-x-hidden'>
            {loading ? <Spinner /> : (
                <div>
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
                        <div className="bg-white rounded-2xl p-4 text-red-700 flex flex-col justify-center h-full">
                            <div className='flex'>
                                <p className="font-bold mr-4">Registered Doctor</p>
                                <button className='my-auto' onClick={() => navigate('/doctor')}>
                                    <FaUserDoctor size={24} />
                                </button>
                                {showDoctor && <p>Show Doctor</p>}
                            </div>
                            <p className="text-xl font-bold">{doctorNumber}</p>
                        </div>
                    </div>

                    <div className='bg-white mt-4 rounded-3xl py-5 lg:px-16  px-6 z-0'>
                        <p className='text-xl font-bold text-blue-700 mb-4'>Add Doctor</p>
                        <form onSubmit={handleSubmit}>
                            <div className='grid md:grid-cols-2 lg:gap-20 gap-6'>
                                <div className="md:mt-3 relative">
                                    <label className="block font-medium text-gray-700 mb-1 ml-2">Doctor Name</label>
                                    <input
                                        type="text"
                                        name="doctorName"
                                        value={formData.doctorName}
                                        onChange={handleChange}
                                        className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
                                        placeholder="Doctor Name"
                                        required
                                    />
                                </div>

                                <div className="md:mt-3 relative">
                                    <label className="block font-medium text-gray-700 mb-1 ml-2">Highest Degree</label>
                                    <Select
                                        options={optionsDegrees}
                                        value={formData.doctorDegree}
                                        onChange={handleDegreeChange}
                                        placeholder="Select Degree"
                                        className="basic-single border-purple-500"
                                        classNamePrefix="select"
                                        required
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderColor: 'purple',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    borderColor: 'darkviolet',
                                                },
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                zIndex: 9999,
                                            }),
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='grid md:grid-cols-2 lg:gap-20 gap-6'>
                                <div className="mt-3 relative">
                                    <label className="block font-medium text-gray-700 mb-1 ml-2">Phone Number</label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>

                                <div className="md:mt-3 relative">
                                    <label className="block font-medium text-gray-700 mb-1 ml-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='grid md:grid-cols-2 lg:gap-20 gap-6'>
                                <div className="mt-3 relative">
                                    <label className="block font-medium text-gray-700 mb-1 ml-2">Experiences</label>
                                    <input
                                        type="number"
                                        name="doctorExperiences"
                                        value={formData.doctorExperiences}
                                        onChange={handleChange}
                                        className="block w-full border border-purple-500 p-2 focus:outline-none rounded-md"
                                        placeholder="Experiences"
                                        required
                                    />
                                </div>

                                <div className="md:mt-3 relative">
                                    <label className="block font-medium text-gray-700 mb-1 ml-2">Specialty</label>
                                    <Select
                                        options={optionsSpecialties}
                                        value={formData.specialty}
                                        onChange={handleSpecialtyChange}
                                        placeholder="Select Specialty"
                                        className="basic-single border-purple-500"
                                        classNamePrefix="select"
                                        required
                                        styles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderColor: 'purple',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    borderColor: 'darkviolet',
                                                },
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                zIndex: 9999,
                                            }),
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='mt-4'>
                                <label className="block font-medium text-gray-700 mb-1 ml-2">About the Doctor</label>
                                <textarea
                                    name="aboutDoctor"
                                    value={formData.aboutDoctor}
                                    onChange={handleChange}
                                    className='block w-full border border-purple-500 p-2 focus:outline-none rounded-md'
                                    placeholder='Write about the doctor...'
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className='my-6 bg-blue-600 hover:bg-blue-700 text-white p-3 font-semibold rounded-xl'
                            >
                                Add Doctor
                            </button>
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
