import React from 'react';
import ReactDom from 'react-dom';
import { Menu } from 'icons/Icons';

const SideDrawer = props => {
  const content = (
    <div
      className={`fixed left-0 top-0 z-50 p-6 h-screen shadow-md bg-white dark:bg-gray-900 transform w-64
      ${
        props.show ? 'translate-x-0' : '-translate-x-full'
      } transition duration-250 ease-in-out`}
    >
      <div className="flex items-center">
        <div className="cursor-pointer" onClick={props.onClick}>
          <Menu />
        </div>
        <div className="text-black dark:text-white ml-6 mb-0.5">LOGO</div>
      </div>

      {props.content}
    </div>
  );
  return ReactDom.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
