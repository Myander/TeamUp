import React, { useState } from 'react';
import Backdrop from '../Backdrop';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const content = (
    <div className="p-6 text-white">
      <div className="flex items-center"></div>
    </div>
  );

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer
        show={drawerIsOpen}
        onClick={closeDrawerHandler}
        content={content}
      />

      <Navbar handleDrawer={openDrawerHandler} />
    </>
  );
};

export default MainNavigation;
