import React, { useContext } from 'react';
import { DefaultButton } from './Buttons';
import Dropdown from './Dropdown';
import PageLink from './PageLink';
import Search from './Search';
import { AuthContext } from 'shared/context/auth-context';
import UserMenu from 'user/components/UserMenu';

const Navbar = () => {
  const auth = useContext(AuthContext);

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
            <UserMenu />
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Navbar;
