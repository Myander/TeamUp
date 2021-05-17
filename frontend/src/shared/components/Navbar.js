import React from 'react';
import Search from './Search';

const Navbar = () => {
  return (
    <div className={`flex justify-between items-center py-2 px-8 shadow`}>
      <div className={`flex`}>
        <div>logo</div>
        <Search />
      </div>
      <div className={`flex items-center`}>buttons</div>
    </div>
  );
};

export default Navbar;
