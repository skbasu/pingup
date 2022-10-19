import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import ChatHeader from '../components/ChatHeader';
import { selectChannelId } from '../features/channelSlice';
import firebase from 'firebase/compat/app';
import Message from '../components/Message';
import './HomeScreen.css';
import { v4 as uuidv4 } from 'uuid';
import GroupLogo from '../assets/group-logo.png';

const HomeScreen = () => {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const addUser = async () => {
            await db.collection("users").doc(user.uid).set({
                name: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
                email: user.email,
            }).catch((err) => alert(err.message))
        }

        const getchats = () => {
            if (channelId) {
                db.collection("chats")
                    .doc(channelId)
                    .collection("messages")
                    .orderBy("chatTimestamp", "asc")
                    .onSnapshot((querySnapshot) => {
                        const items = [];
                        querySnapshot.forEach((doc) => {
                            items.push(doc.data());
                        });
                        setChats(items);
                    });
            }
        }
        getchats();
        addUser();
    }, [channelId, user])

    const sendMessage = async (newMessage) => {
        await db.collection("chats")
            .doc(channelId)
            .collection("messages")
            .doc(newMessage.chatID)
            .set(newMessage)
            .then(() => setMessage("")).catch((err) => alert(err.message))
    }

    return (
        <div className='flex h-screen'>
            <SidebarLeft />
            <div className='noscrollbar w-3/4 bg-slate-300 pb-24' style={{ overflowY: "scroll" }}>
                {
                    channelId != null ? (
                        <div>
                            <ChatHeader className="fixed" />
                            {
                                chats.map((chat) => (
                                    <Message
                                        key={chat.chatID}
                                        id={chat.chatUserId}
                                        text={chat.chatText}
                                        avatar={chat.chatUserPhoto}
                                        umane={chat.chatUserName}
                                        timestamp={chat.chatTimestamp}
                                    />
                                ))
                            }
                            <div
                                className='absolute bottom-0 w-8/12 p-4 text-center bg-white flex'>
                                <input
                                    type="text"
                                    className='w-11/12 h-10 p-2 rounded-2xl bg-gray-300 focus:outline-none'
                                    placeholder='Send Message'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                {
                                    message.length > 0 ? (
                                        <svg
                                            onClick={() => sendMessage({
                                                chatID: uuidv4(),
                                                chatText: message,
                                                chatUserId: user.uid,
                                                chatUserEmail: user.email,
                                                chatUserName: user.displayName,
                                                chatUserPhoto: user.photoURL,
                                                chatTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                            })}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="#1d4ed8"
                                            className="w-8 h-8 mt-auto mb-auto ml-3 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="gray"
                                            className="w-8 h-8 mt-auto mb-auto ml-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                    )
                                }
                            </div>
                        </div>
                    ) : (
                        <div>
                            <img 
                                alt='Group Logo'
                                className='mx-auto w-88 h-80 opacity-50'
                                src={GroupLogo} />
                            <h1 className='mt-6 text-slate-400 text-center text-2xl'>
                                Select a channel to start chatting
                            </h1>
                        </div>
                    )
                }
            </div>
            <SidebarRight />
        </div>
    );
}



export default HomeScreen;