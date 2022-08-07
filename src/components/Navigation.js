import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// Link와 NavLink의 차이는 URL이 활성화될 시 스타일 적용 여부
import BtnTheme from './BtnTheme';

const Navigation = ({ userObj }) => {
  const userName = (() => {
    if (!userObj.displayName) return '프로필 이름을 설정해 주세요';
    else return userObj.displayName;
  })();
  const activeStyle = {
    'borderBottom': '1px solid darkgrey',
  }
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/profile' activeStyle={activeStyle}>{userName}'s Profile</NavLink>
        </li>
      </ul>
      <BtnTheme />
    </nav>
  )
}

export default Navigation