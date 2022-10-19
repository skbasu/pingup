import React, { useEffect } from 'react';
import Logo from '../assets/pingupLogo.png';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../firebase';
import { login, logout } from '../features/userSlice';

const SigninScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (authUser) {
                dispatch(login({
                    uid: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                    photoURL: authUser.photoURL,
                }));
            } else {
                dispatch(logout());
            }
        })
    }, [dispatch])

    const signIn = async () => {
        auth.signInWithPopup(provider)
            .catch((err) => {
                alert(err.message);
            });
    }

    return (
        <div className='grid place-items-center h-screen'>
            <img className='object-contain h-40' src={Logo} alt="Logo" />
            <button onClick={signIn} className='bg-blue-700 hover:bg-sky-600 w-80 p-2 rounded font-bold text-gray-50'>
                Continue With Google
            </button>
        </div>
    );
}

export default SigninScreen;