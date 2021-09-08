import React, { useContext } from 'react';
import { DefaultButton } from '../Buttons';
import Dropdown from '../Dropdown';
import PageLink from '../PageLink';
import Search from '../Search';
import { AuthContext } from 'shared/context/auth-context';
import UserMenu from 'user/components/UserMenu';
import { Menu } from 'icons/Icons';

const Navbar = props => {
  const auth = useContext(AuthContext);

  return (
    <div
      className={`flex justify-between items-center py-2 px-8 shadow dark:bg-gray-800`}
    >
      <div className={`flex items-center`}>
        <div className="cursor-pointer" onClick={props.handleDrawer}>
          <Menu />
        </div>
        <div className="ml-4 mb-0.5">LOGO</div>
        <Search />
      </div>
      <div className={`flex items-center space-`}>
        {!auth.isLoggedIn && (
          <>
            <PageLink to={`/login`}>
              <DefaultButton>Login</DefaultButton>
            </PageLink>
            <PageLink to={`/signup`}>
              <DefaultButton>Signup</DefaultButton>
            </PageLink>
          </>
        )}
        {auth.isLoggedIn && (
          <Dropdown>
            <UserMenu />
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Navbar;
