import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Message = ({ id, text, avatar, umane, timestamp }) => {

    const user = useSelector(selectUser);
    
    return (
        <div>
            {
                id == user.uid ? (
                    <div>
                        <div className='flex justify-end pl-2 pr-2 pt-1'>
                            <h3
                                className='shadow-2xl bg-blue-700 text-white p-2 rounded-2xl w-fit max-w-md cursor-pointer'>
                                {text}
                            </h3>
                        </div>
                        <p
                            className='pl-12 mr-4 flex justify-end text-slate-500'
                            style={{ fontSize: "10px" }}
                        >
                            {new Date(timestamp?.toDate()).toLocaleString()}
                        </p>
                    </div>
                ) : (
                    <div className='mt-2'>
                        <p
                            style={{ fontSize: "12px" }}
                            className='pl-12 text-slate-500'
                        >
                            {umane}
                        </p>
                        <div className='pl-1 pr-2 flex'>
                            <img
                                className='mt-6 w-10 h-10 rounded-full'
                                src={avatar}
                            />
                            <div className=''>
                                <h3 className='shadow-2xl bg-slate-400 p-2 rounded-2xl w-fit max-w-md'>
                                    {text}
                                </h3>
                            </div>
                        </div>
                        <p
                            className='pl-12 -mt-6 text-slate-500'
                            style={{ fontSize: "10px" }}
                        >
                            {new Date(timestamp?.toDate()).toLocaleString()}
                        </p>
                    </div>
                )
            }
        </div>
    );
}

export default Message;