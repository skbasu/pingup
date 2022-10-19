import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { selectChannelName, selectChannelPhoto, selectChannelId } from '../features/channelSlice';
import db from '../firebase';
import { splitName } from '../utils';
import InfoLogo from '../assets/info-logo.png';

const SidebarRight = () => {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelPhoto = useSelector(selectChannelPhoto);
  const channelId = useSelector(selectChannelId);
  
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (channelId) {
      const getMembers = () => {
        db.collection("members")
          .doc(channelId)
          .collection("participants")
          .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setMembers(items);
          });
      }
      getMembers();
    }
  }, [channelId])

  return (
    <div className='w-56 bg-slate-100'>
      {
        channelId != null ? (
          <div>
            <img
              className='h-40 w-40 text-center mx-auto pt-2 rounded-full'
              src={channelPhoto}
              alt="Channel Avatar"
            />
            <h2 className='text-center text-md pt-1 font-semibold'>{channelName}</h2>
            <h4 className='text-center mt-4 mb-2 text-md font-medium'>Total { members.length } Members</h4>
            {
              members.map((member) => (
                <div key={member.uid} className='px-2 py-1  flex flex-row'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={member.uphoto}
                    alt="Member Avatar"
                  />
                  {
                    member.uname === user.displayName ? (
                      <h3
                        className='text-black font-medium pl-2 text-sm mt-auto mb-auto'
                      >You</h3>
                    ) : (
                      <h3
                        className='text-black font-medium pl-2 text-sm mt-auto mb-auto'
                      >{splitName(member.uname)}</h3>
                    )
                  }
                </div>
              ))
            }
          </div>
        ) : (
          <div>
            <img 
              alt='Info Logo'
              className='mt-20 opacity-50'
              src={InfoLogo} 
            />
            <h2 className='mt-4 text-slate-400 text-center text-md'>
              No Channel is selected
            </h2>
          </div>
        )
      }
    </div>
  )
}

export default SidebarRight;