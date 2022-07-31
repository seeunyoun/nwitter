import React, { useState } from 'react';
import authService from '../Firebase';
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const [error, setError] = useState('');
  const onSocialClick = async (e) => {
    const { target: { name } }= e;
    let provider;
    try {
      if (name === 'google') provider = new GoogleAuthProvider();
      else if (name === 'github') provider = new GithubAuthProvider();
      await signInWithPopup(authService, provider);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className='auth'>
      <h2 className='title'>Nweeter</h2>
      <AuthForm />
      <div className='social-login-wrapper'>
        <button name='google' onClick={onSocialClick}>Continue with Google</button>
        <button name='github' onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth