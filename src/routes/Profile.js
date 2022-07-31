import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import authService, { dbService, firebaseInstance } from '../Firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { updateProfile } from '@firebase/auth';

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }
  const getMyNweets = async () => {
    const q = query(collection(dbService, 'nweets'), where('creatorId', '==', userObj.uid), orderBy('createdAt'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '==', doc.data())
    });
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
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder='Display name' value={newDisplayName} />
        <input type="submit" value='Update Profile' />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile