import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectChannelName, selectChannelPhoto, selectChannelId } from '../features/channelSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import db from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore'
import firebase from 'firebase/compat/app';

const ChatHeader = () => {

  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelPhoto = useSelector(selectChannelPhoto);
  const channelId = useSelector(selectChannelId);
  
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [memberID, setMemberId] = useState("")
  const [userDetails, setUserDetails] = useState([]);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const searchUser = async () => {
    const q = query(collection(db, "users"), where("uid", "==", memberID))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data());
    });

    handleClose1();
    handleClickOpen2();
  }

  const newMember = async () => {

    //Creating the reference of the userchannel
    db.collection("userChannels")
      .doc(memberID)
      .collection("channels")
      .doc(channelId)
      .set({
        channelName: channelName,
        channelId: channelId,
        channelPhoto: channelPhoto,
        channelCreatedBy: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).catch((err) => alert(err.message))

    db.collection("members")
      .doc(channelId)
      .collection("participants")
      .doc(user.uid)
      .set({
        uid: user.uid,
        uemail: user.email,
        uphoto: user.photoURL,
        uname: user.displayName,
      }).catch((err) => alert(err.message))

    db.collection("members")
      .doc(channelId)
      .collection("participants")
      .doc(memberID)
      .set({
        uid: memberID,
        uemail: userDetails.email,
        uphoto: userDetails.photoURL,
        uname: userDetails.name,
      }).then(() => handleClose2()).catch((err) => alert(err.message))
  }

  return (
    <div className='bg-white p-2 shadow-md'>
      <div className='flex flex-row'>
        <img
          className="w-12 h-12 rounded-full ml-2"
          src={channelPhoto}
          alt="Channel Avatar"
        />
        <h2 className='align-center ml-2 mt-auto mb-auto text-2xl font-semibold flex-1'>
          {channelName}
        </h2>
        <div className='flex justify-end'>
          <svg onClick={handleClickOpen1} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1d4ed8" className="w-8 h-8 mt-auto mb-auto cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
        </div>
      </div>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Add New Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            onChange={(e) => setMemberId(e.target.value)}
            margin="dense"
            id="name"
            label="Member UID"
            type="text"
            fullWidth
            variant="standard"
          />
          <br />
        </DialogContent>
        <DialogActions>
          {
            memberID.length === 28 ? (
              <Button onClick={searchUser}>Add</Button>
            ) : (
              <Button disabled>Add</Button>
            )
          }
          <Button onClick={handleClose1}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Adding New Member...</DialogTitle>
        <DialogContent>
          <h1>{userDetails.name}</h1>
          <h2>{userDetails.email}</h2>
        </DialogContent>
        <DialogActions>
          <Button onClick={newMember}>Confirm</Button>
          <Button onClick={handleClose2}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChatHeader;