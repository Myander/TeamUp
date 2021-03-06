import React from 'react';
import { DefaultButton } from '../Buttons';
import Dropdown from '../Dropdown';
import PageLink from '../PageLink';
import Search from '../Search';
import UserMenu from 'user/components/UserMenu';
import {
  Menu,
  NotificationOutline,
  Notifications,
  AccountCircle,
} from 'icons/Icons';

const Navbar = ({ isLoggedIn, handleDrawer }) => {
  // console.log('isLoggedIn', isLoggedIn);
  return (
    <div
      className={`fixed z-30 left-0 top-0 w-full h-12 flex justify-between items-center py-4 px-8 shadow bg-white dark:bg-gray-800`}
    >
      <div className={`flex items-center`}>
        <div className="cursor-pointer" onClick={handleDrawer}>
          <Menu />
        </div>
        <div className="ml-4 mb-0.5">LOGO</div>
        <Search />
      </div>
      <div className={`flex items-center`}>
        {!isLoggedIn && (
          <>
            <PageLink to={`/login`}>
              <DefaultButton>Login</DefaultButton>
            </PageLink>
            <PageLink to={`/signup`}>
              <DefaultButton>Signup</DefaultButton>
            </PageLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <Dropdown icon={<NotificationOutline />}>
              <div className="w-80 h-96"></div>
            </Dropdown>
            <Dropdown icon={<AccountCircle />}>
              <UserMenu />
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
