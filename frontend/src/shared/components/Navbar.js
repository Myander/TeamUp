import React, { useContext } from 'react';
import { DefaultButton } from './Buttons';
import Dropdown from './Dropdown';
import PageLink from './PageLink';
import Search from './Search';
import Toggle from './Toggle';
import { AuthContext } from '../context/auth-context';

const Navbar = () => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <div
      className={`flex justify-between items-center py-2 px-8 shadow dark:bg-gray-800`}
    >
      <div className={`flex`}>
        <div>logo</div>
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
            <Toggle />
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Navbar;
