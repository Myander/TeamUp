import React, { useContext } from 'react';
import { Settings, Groups, Logout, Theme } from 'icons/Icons';
import { Toggle } from 'shared/components/Toggle';
import { AuthContext } from 'shared/context/AuthContext';

const MenuRow = props => (
  <div
    className="flex mb-2 pl-5 py-2 align-center
     hover:bg-gray-300 dark:hover:bg-gray-600"
    onClick={props.handleClick}
  >
    {props.children}
  </div>
);

const MenuRowNoHover = props => (
  <div className="flex mb-2 pl-5 py-2 align-center">{props.children}</div>
);

const MenuText = props => (
  <div className="ml-4 dark:text-white">{props.children}</div>
);

const UserMenu = () => {
  const { dispatch, logout } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    logout();
  };

  return (
    <div className="w-48 py-4">
      <MenuRow>
        <Settings />
        <MenuText>Settings</MenuText>
      </MenuRow>
      <MenuRowNoHover>
        <Theme />
        <MenuText>Theme</MenuText>
        <Toggle />
      </MenuRowNoHover>
      <MenuRow>
        <Groups />
        <MenuText>My Teams</MenuText>
      </MenuRow>
      <MenuRow handleClick={handleLogout}>
        <Logout />
        <MenuText>Logout</MenuText>
      </MenuRow>
    </div>
  );
};

export default UserMenu;
