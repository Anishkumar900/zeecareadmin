import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Spinner/Spinner';

export default function Userdetailsone({ username, created_at, updated_at, status, _id, refreshUsers }) {
  const [data, setData] = useState({
    username: username,
    created_at: '_._',
    updated_at: '_._',
    status: status,
  });
  const [open, setOpen] = useState(false);

  const userDelet = () => {
    setOpen(true);
  };

  useEffect(() => {
    const createDate = new Date(created_at);
    const updateDate = new Date(updated_at);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const st = status[0].toUpperCase() + status.slice(1).toLowerCase();

    setData((prevData) => ({
      ...prevData,
      status: st,
      created_at: createDate.toLocaleString('en-US', options),
      updated_at: updateDate.toLocaleString('en-US', options),
    }));
  }, [created_at, updated_at, username, status]);

  const handleClickOpen = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/deletuser`, { _id: _id })
      .then((response) => {
        toast.success('User Deleted Successfully!', {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
        refreshUsers(); // Call the refresh function to update the user list
      })
      .catch((error) => {
        toast.error('Something Went Wrong!', {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='bg-green-50 p-2 shadow-md flex justify-between'>
      <div>
        <p>{data.username}</p>
        <p className='text-red-600'>{data.status}</p>
        <p>Created At: {data.created_at}</p>
        <p>Updated At: {data.updated_at}</p>
      </div>
      <button onClick={userDelet}><MdDelete className='hover:shadow-xl hover:bg-slate-400 hover:rounded-sm' size={24} color='red' /></button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Do you want to delete this user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText className='text-red-500'>
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} className='hover:bg-red-400'>
            Cancel
          </Button>
          <Button onClick={handleClickOpen} autoFocus className='hover:bg-lime-300'>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
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
