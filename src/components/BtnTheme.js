import React, { useState } from 'react';

function BtnTheme() {
  const [theme, setTheme] = useState('Light');
  const onClick = () => {
    if (theme === 'Light') setTheme('Dark');
    else setTheme('Light');
  }

  return (
    <button className='btn-theme' onClick={onClick}>
      {theme} Mode
    </button>
  )
}

export default BtnTheme