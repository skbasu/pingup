import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import SigninScreen from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import WindowSize from './screenSize';
import GroupLogo from './assets/group-logo.png';
import PingUpLogo from './assets/pingupLogo.png';

const App = () => {

  const [width] = WindowSize();
  const user = useSelector(selectUser);

  return (
    <div>
      {
        width > 900 ? (
          <div className='App'>
            {user ? (<HomeScreen />) : (<SigninScreen />)}
          </div>
        ) : (
          <div className='App'>
            <img
              className="mt-4 w-60 h-22 mx-auto"
              src={PingUpLogo}
              alt="Logo"
            />
            <img
              className="mt-4 w-80 h-40 mx-auto opacity-50"
              src={GroupLogo}
              alt="Logo"
            />
            <h1 className='mt-6 text-slate-400 text-center text-xl mx-2'>
              Please open this application on a personal computer. Cheers!!
            </h1>
            <h1 className='mt-6 text-slate-400 text-center text-md'>Made with 
              <p className='opacity-50' style={{ fontSize: "200%", color: "red", margin: "56" }}>&hearts;</p> 
              in Kolkata
            </h1>
          </div>
        )
      }
    </div>
  );
}

export default App;
