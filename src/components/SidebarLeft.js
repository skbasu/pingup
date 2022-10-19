import React, { useState, useEffect } from 'react';
import ChatParticipant from './ChatParticipant';
import Header from './Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';

const SidebarLeft = () => {

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const getChannels = () => {
            db.collection("userChannels").doc(user.uid)
                .collection("channels").orderBy("timestamp", "desc")
                .onSnapshot((querySnapshot) => {
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    });
                    setChannels(items);
                });
        }

        getChannels();
    }, [user])

    return (
        <div className='bg-blue-700 w-72'>
            <Header />
            {
                channels.length === 0 ? (
                    <h2 className='mt-6 ml-2 mb-4 text-white text-xl font-bold'>Create a channel</h2>
                ) : (
                    <h2 className='mt-6 ml-2 mb-4 text-white text-xl font-bold'>My Channels</h2>
                )
            }
            <div>
                {
                    channels.map((channel) => (
                        <ChatParticipant
                            id={channel.channelId}
                            key={channel.channelId}
                            chName={channel.channelName}
                            chPhoto={channel.channelPhoto}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default SidebarLeft;