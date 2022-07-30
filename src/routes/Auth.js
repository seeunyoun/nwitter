import React, { useState } from 'react';
import authService, { firebaseInstance } from '../Firebase';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '@firebase/auth';

const Auth = () => {
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
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(
                    authService, email, password
                )
            } else {
                data = await signInWithEmailAndPassword(
                    authService, email, password
                )
            }
            console.log(data)
        } catch (error) {
            setError(error.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev => !prev));
    const onSocialClick = async (e) => {
        const { target: { name } }= e;
        let provider;
        try {
            if (name === 'google') provider = new GoogleAuthProvider();
            else if (name === 'github') provider = new GithubAuthProvider();
            const data = await signInWithPopup(authService, provider);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Please Login</h2>
            <form onSubmit={onSubmit}>
                <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange} />
                <input name='password' type='password' placeholder='Password' required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Log In' : 'Create Account'}
            </span>
            <div>
                <button name='google' onClick={onSocialClick}>Continue with Google</button>
                <button name='github' onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth