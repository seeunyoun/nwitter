import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// Link와 NavLink의 차이는 URL이 활성화될 시 스타일 적용 여부

const Navigation = ({ userObj }) => {
  const activeStyle = {
    'borderBottom': '1px solid #000',
  }
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink exact to='/' activeStyle={activeStyle}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/profile' activeStyle={activeStyle}>{userObj.displayName}'s Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation