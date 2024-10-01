import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
// import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Spinner from '../Spinner/Spinner';

export default function OneDoctorCart(props) {
    const [degree, setDegree] = useState(null);
    const [specialty, setSpecialty] = useState(null);
    // const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (props.doctorDegree && props.doctorDegree.value) {
            setDegree(props.doctorDegree.value);
        }
        if (props.specialty && props.specialty.value) {
            setSpecialty(props.specialty.value);
        }
    }, [props.doctorDegree, props.specialty]);

    const deleteDoctor = () => {
        setOpen(true);
    }

    const conformDeleteDoctor = () => {
        setOpen(false);
        props.onDelete(props._id);  // Call the delete function passed from the parent
    }

    return (
        // loading ? <Spinner /> : (
        <div className="max-w-full  bg-white shadow-lg rounded-lg overflow-hidden my-4 lg:p-6 p-2 flex justify-between">
            <div>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">{props.doctorName}</h2>
                <p className="text-gray-600 text-sm my-1 font-bold">Phone Number: <span className="text-gray-800 font-normal">{props.phoneNumber}</span></p>
                <p className="text-gray-600 text-sm my-1 font-bold">Email: <span className="text-gray-800 font-normal">{props.email}</span></p>
                <p className="text-gray-600 text-sm my-1 font-bold">Doctor Degree: <span className="text-gray-800 font-normal">{degree}</span></p>
                <p className="text-gray-600 text-sm my-1 font-bold">Doctor Experiences: <span className="text-gray-800 font-normal">{props.doctorExperiences}+ yr</span></p>
                <p className="text-gray-600 text-sm my-1 font-bold">Specialty: <span className="text-gray-800 font-normal">{specialty}</span></p>
                <p className="text-gray-600 text-sm my-1 font-bold">About: <span className="text-gray-800 font-normal">{props.aboutDoctor}</span></p>
            </div>
            <div className=' right-0'>
                <button onClick={deleteDoctor}><MdDelete size={24} color='red' /></button>
                <Dialog
                    // fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Are you sure you want to delete this doctor?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            If you wish to proceed with the deletion, please click "Delete."
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className='bg-red-500 text-white hover:bg-red-600'
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={conformDeleteDoctor}
                            className='bg-lime-500 text-white hover:bg-lime-600'
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
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

        </div>
        // )
    );
}


































// import React, { useEffect, useState } from 'react';
// import { MdDelete } from "react-icons/md";
// import axios from 'axios';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useTheme } from '@mui/material/styles';
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Spinner from '../Spinner/Spinner';



// export default function OneDoctorCart(props) {
//     const [degree, setDegree] = useState(null);
//     const [specialty, setSpecialty] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const [open, setOpen] = React.useState(false);
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


//     const handleClose = () => {
//         setOpen(false);
//         // console.log("close");
//     };

//     useEffect(() => {
//         if (props.doctorDegree && props.doctorDegree.value) {
//             setDegree(props.doctorDegree.value);
//         }
//         if (props.specialty && props.specialty.value) {
//             setSpecialty(props.specialty.value); // Correctly reference props.specialty
//         }
//     }, [props.doctorDegree, props.specialty]);

//     // console.log(props._id); // Debugging output

//     const deleteDoctor = () => {
//         setOpen(true);

//     }

//     const conformdeleteDoctor = () => {
//         setOpen(false);
//         setLoading(true);
//         // console.log('deleyt123456');
//         axios.post(`${process.env.REACT_APP_BASE_URL}/deletdoctor`, { _id: props._id })
//             .then((response) => {
//                 // console.log(response.data);
//                 setLoading(false);
//                 toast.success('Doctor Deleted Successfully!', {
//                     position: "top-center",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     transition: Bounce,
//                 });
//             })
//             .catch((error) => {
//                 // console.error(error);
//                 setLoading(false);
//                 toast.error('Doctor Not Deleted!', {
//                     position: "top-center",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     transition: Bounce,
//                 });
//             });
//     }

//     return (


//         loading ? <Spinner /> :

//             <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4 p-6 flex justify-between">
//                 <div>
//                     <h2 className="text-2xl font-bold text-violet-700 mb-4">{props.doctorName}</h2>
//                     <p className="text-gray-600 text-sm my-1 font-bold">Phone Number: <span className="text-gray-800 font-normal">{props.phoneNumber}</span></p>
//                     <p className="text-gray-600 text-sm my-1 font-bold">Email: <span className="text-gray-800 font-normal">{props.email}</span></p>
//                     <p className="text-gray-600 text-sm my-1 font-bold">Doctor Degree: <span className=" text-gray-800 font-normal">{degree}</span></p>
//                     <p className="text-gray-600 text-sm my-1 font-bold">Doctor Experiences: <span className="text-gray-800 font-normal">{props.doctorExperiences}+ yr </span></p>
//                     <p className="text-gray-600 text-sm my-1 font-bold">Specialty: <span className="text-gray-800 font-normal">{specialty}</span></p>
//                     <p className="text-gray-600 text-sm my-1 font-bold">About: <span className="text-gray-800 font-normal">{props.aboutDoctor}</span></p>
//                 </div>
//                 <div>
//                     <button onClick={deleteDoctor}><MdDelete size={24} color='red' /></button>
//                     <Dialog
//                         fullScreen={fullScreen}
//                         open={open}
//                         onClose={handleClose}
//                         aria-labelledby="responsive-dialog-title"
//                     >
//                         <DialogTitle id="responsive-dialog-title">
//                             {"Are you sure you want to delete this doctor?"}
//                         </DialogTitle>
//                         <DialogContent>
//                             <DialogContentText>
//                                 If you wish to proceed with the deletion, please click "Delete."
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button
//                                 className='bg-red-500 text-white hover:bg-red-600'
//                                 onClick={handleClose}
//                             >
//                                 Close
//                             </Button>
//                             <Button
//                                 onClick={conformdeleteDoctor}
//                                 className='bg-lime-500 text-white hover:bg-lime-600'
//                                 autoFocus
//                             >
//                                 Delete
//                             </Button>
//                         </DialogActions>
//                     </Dialog>


//                 </div>
//                 <ToastContainer
//                     position="top-center"
//                     autoClose={3000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="light"
//                     transition={Bounce}
//                 />
//             </div>



//     );
// }
