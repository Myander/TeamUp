import React, { useState, useContext } from 'react';
import { AuthContext } from 'shared/context/AuthContext';
import UserTeams from 'teams/components/UserTeams';
import Backdrop from '../Backdrop';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  const { userId } = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const content = (
    <div className="text-black dark:text-white">
      <div className="flex items-center">
        <UserTeams
          userId={userId}
          handleCloseDrawer={closeDrawerHandler}
          open={drawerIsOpen}
        />
      </div>
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

      <Navbar isLoggedIn={!!userId} handleDrawer={openDrawerHandler} />
    </>
  );
};

export default MainNavigation;
