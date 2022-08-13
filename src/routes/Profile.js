import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import authService, { dbService, firebaseInstance } from '../Firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { updateProfile } from '@firebase/auth';

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const userName = (() => {
    if (!userObj.displayName) return '';
    else return userObj.displayName;
  })();
  const [newDisplayName, setNewDisplayName] = useState(userName)
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }
  const getMyNweets = async () => {
    const q = query(collection(dbService, 'nweets'), where('creatorId', '==', userObj.uid), orderBy('createdAt'));
    await getDocs(q);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(firebaseInstance.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setNewDisplayName(value);
  }
  useEffect(() => {
    getMyNweets()
  }, []);

  return (
    <div className="col-sm-4 col-md-8 col-lg-9">
      <div className='profile'>
        <h2 className='title'>Change your profile name</h2>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" placeholder='Display name' value={newDisplayName} />
          <input type="submit" value='Update Profile' />
        </form>
        <button className='btn-logout' onClick={onLogOutClick}>Log Out</button>
      </div>
    </div>
  )
}

export default Profile