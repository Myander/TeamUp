import React from 'react';
import useThemeChanger from '../hooks/theme-hook';
import './style.css';

const Toggle = () => {
  const { toggleTheme } = useThemeChanger();

  return (
    <label className="switch">
      <input type="checkbox" className="checkbox" onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
};

export default Toggle;
