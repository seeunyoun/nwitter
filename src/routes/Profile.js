import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import authService, { dbService } from '../Firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Profile = ({ userObj }) => {
  const history = useHistory();
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
  useEffect(() => {
    getMyNweets()
  }, [])

  return (
    <div>
      Profile
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile