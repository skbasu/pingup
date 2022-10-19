import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import db from '../firebase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app';

const Header = () => {

    const user = useSelector(selectUser);

    const [open, setOpen] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [chname, setChname] = useState("");
    const [chphoto, setPhoto] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenP = () => {
        setOpenP(true);
    };

    const handleCloseP = () => {
        setOpenP(false);
    };

    const signOut = () => {
        auth.signOut();
    }

    const createNewGroup = async (newGroup) => {
        db.collection("userChannels")
            .doc(user.uid)
            .collection("channels")
            .doc(newGroup.channelId)
            .set(newGroup)
            .catch((err) => alert(err.message))
        handleClose();
    }

    return (
        <div className='flex flex-row p-2 justify-between'>
            <img
                onClick={handleClickOpenP}
                className='rounded-full h-12 w-12 cursor-pointer'
                src={user.photoURL}
                alt="Profile Avatar"
            />
            <h2 className='text-white font-bold text-2xl mt-1'>
                PingUp
            </h2>

            <svg onClick={handleClickOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8 mt-2 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Channel</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        onChange={(e) => setChname(e.target.value)}
                        margin="dense"
                        id="name"
                        label="Channel Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <br />
                    <TextField
                        autoFocus
                        onChange={(e) => setPhoto(e.target.value)}
                        margin="dense"
                        id="name"
                        label="Channel PhotoUrl"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    {
                        chname.length > 0 && chphoto.length > 0 ? (
                            <Button
                                onClick={() => createNewGroup({
                                    channelName: chname,
                                    channelId: uuidv4(),
                                    channelPhoto: chphoto,
                                    createdBy: user.uid,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                })}
                            >Create</Button>
                        ) : (
                            <Button disabled>Create</Button>
                        )
                    }
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Profile Dialog */}
            <Dialog
                open={openP}
                onClose={handleCloseP}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <h2 className="text-center mt-4 text-2xl font-bold">My Profile</h2>
                <DialogContent>
                    <img 
                        className='w-16 h-16 rounded-full mx-auto'
                        src={user.photoURL} 
                        alt="User Avatar" 
                    />
                    <h3 className='text-center mt-1 text-lg font-bold'>{user.displayName}</h3>
                    <h3 className='text-center mt-1 text-md font-semibold'>{user.uid}</h3>
                    <h3 className='text-center mt-1 text-md'>{user.email}</h3>
                </DialogContent>
                <DialogActions>
                    <Button onClick={signOut}>Sign Out</Button>
                    <Button onClick={handleCloseP}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Header