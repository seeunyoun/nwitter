import React from 'react';
import { useHistory } from 'react-router';
import authService from '../Firebase';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  }

  return (
    <div>
      Profile
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  )
}

export default Profile