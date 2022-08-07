import React, { useState } from 'react';

const BtnTheme = () => {
  const btnThemeText = (() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'Light';
    else return 'Dark';
  })();
  const [theme, setTheme] = useState(btnThemeText);
  const onClick = () => {
    const $theme = document.querySelector('html');
    if (theme === 'Light') {
      setTheme('Dark');
      $theme.classList.add('light');
      $theme.classList.remove('dark');
    }
    else {
      setTheme('Light');
      $theme.classList.add('dark');
      $theme.classList.remove('light');
    }
  }

  return (
    <button className='btn-theme' onClick={onClick}>
      {theme} Mode
    </button>
  )
}

export default BtnTheme