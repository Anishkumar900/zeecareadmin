import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';


export default function AppointmentDetails({ appointmentNumbar, patient, date, time, doctor, department, status, deleted, _id, onUpdate,email }) {
    const [statusUpdate, setStatusUpdate] = useState(status);
    const [deleteStatus, setDeleteStatus] = useState(deleted ? 'Deleted' : 'Active');
    const [delet, setDelet] = useState(deleted);
    const [open, setOpen] = useState(false);
    const [opendelet, setOpendelet] = useState(false);

    const handleCloseAgree = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/updatedelet`, { _id, deleted: delet });
            onUpdate();
        } catch (error) {
            console.error('Error updating delete status:', error);
        }
        setOpendelet(false);
    };

    const handleCloseDisagree = () => {
        onUpdate();
        setOpendelet(false);
    };

    const handleDeletChange = (e) => {
        const value = e.target.value;
        setDeleteStatus(value);
        setDelet(value === 'Deleted');
        setOpendelet(true);
    };

    const handleStatesChange = (e) => {
        setStatusUpdate(e.target.value);
        setOpen(true);
    };

    const handleCloseStatesDisagree = () => {
        onUpdate();
        setOpen(false);
    };

    const handleCloseStatesAgree = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/updatestatus`, { _id, status: statusUpdate });
            onUpdate();
        } catch (error) {
            console.error('Error updating status:', error);
        }
        setOpen(false);
    };

    const formatDate = (date) => {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options);
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const fullName = (patient) => {
        const names = patient.split(' ');
        const firstName = capitalize(names[0]);
        const lastName = names.length > 1 ? names[1] : '';
        return lastName ? `${firstName} ${lastName}` : firstName;
    };

    useEffect(() => {
        setDelet(deleted);
        setDeleteStatus(deleted ? 'Deleted' : 'Active');
    }, [deleted]);

    return (
        <>
            <td className='text-center p-2'>{appointmentNumbar}</td>
            <td className='text-center p-2'>{email}</td>
            <td className='text-center p-2'>{fullName(patient)}</td>
            <td className='text-center p-2'>{formatDate(date)}</td>
            <td className='text-center p-2'>{time}</td>
            <td className='text-center p-2'>{doctor}</td>
            <td className='text-center p-2'>{department}</td>
            <td className='text-center p-2'>
                <select
                    className={`bg-gray-100 border border-gray-300 rounded p-1 focus:outline-none ${deleteStatus === 'Active' ? 'bg-lime-100' : 'bg-red-100'}`}
                    value={deleteStatus}
                    onChange={handleDeletChange}
                >
                    <option value="Active" className='text-lime-700 bg-lime-100'>Active</option>
                    <option value="Deleted" className='text-red-700 bg-red-100'>Deleted</option>
                </select>
                <Dialog
                    open={opendelet}
                    onClose={handleCloseDisagree}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to change the delete status?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Confirm if you want to change the delete status.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDisagree}>Disagree</Button>
                        <Button onClick={handleCloseAgree} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </td>

            <td className='text-center p-2'>
                <select
                    className={`bg-gray-100 border border-gray-300 rounded p-1 focus:outline-none ${statusUpdate === 'pending' ? 'bg-orange-100' : statusUpdate === 'approved' ? 'bg-lime-100' : statusUpdate === 'rejected' ? 'bg-red-100' : ''}`}
                    value={statusUpdate}
                    onChange={handleStatesChange}
                >
                    <option value="pending" className='text-orange-700 bg-orange-100'>Pending</option>
                    <option value="approved" className='text-lime-700 bg-lime-100'>Approved</option>
                    <option value="rejected" className='text-red-700 bg-red-100'>Rejected</option>
                </select>
                <Dialog
                    open={open}
                    onClose={handleCloseStatesDisagree}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Do you want to change the status?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Confirm if you want to change the status.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseStatesDisagree}>Disagree</Button>
                        <Button onClick={handleCloseStatesAgree} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </td>
        </>
    );
}
