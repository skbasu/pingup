import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannel } from '../features/channelSlice';
import { elipsis } from '../utils';

const ChatParticipant = ({ id, chName, chPhoto }) => {

    const dispatch = useDispatch();
    return (
        <div 
            onClick={() => 
                dispatch(
                    setChannel({
                        channelId: id,
                        channelName: chName,
                        channelPhoto: chPhoto,
                    })
                )
            } 
            className='p-1 m-1 rounded-xl flex cursor-pointer hover:bg-blue-600 shadow-xl'
        >
            <img
                className='p-1 w-12 h-12 rounded-full'
                src={chPhoto}
                alt="Channel Avatar"
            />
            <h1 className='mt-2 ml-2 text-white text-xl'>{elipsis(chName, 19)}</h1>
        </div>
    )
}

export default ChatParticipant;