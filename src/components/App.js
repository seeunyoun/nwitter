import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import authService from '../Firebase';
import { onAuthStateChanged } from '@firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, [])

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
    </>
  );
}

export default App;
