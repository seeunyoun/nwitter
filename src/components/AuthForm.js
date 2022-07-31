import React, { useState } from 'react';
import authService from '../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(
          authService, email, password
        )
      } else {
        await signInWithEmailAndPassword(
          authService, email, password
        )
      }
    } catch (error) {
      setError(error.message)
    }
  }
  const toggleAccount = () => setNewAccount((prev => !prev));
  return (
    <div className='auth-form-wrapper'>
      <form onSubmit={onSubmit}>
        <input className='email-input' name='email' type='email' placeholder='Email' required value={email} onChange={onChange} />
        <input className='password-input' name='password' type='password' placeholder='Password' required value={password} onChange={onChange} />
        <input className='submit-input' type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <div className='toggle-text' onClick={toggleAccount}>
        {newAccount ? `I've got the accout. Log In` : `I don't have an account. Create Account`}
      </div>
    </div>
  )
}

export default AuthForm