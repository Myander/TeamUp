import { AccountCircle } from 'icons/Icons';
import React from 'react';
import useClickOutside from 'shared/hooks/clickOutside-hook';
import useEscKeyPress from 'shared/hooks/escKeyPress-hook';

const Dropdown = props => {
  const { containerRef, clickOutside, toggleClickInside } = useClickOutside();
  useEscKeyPress(toggleClickInside, !clickOutside);

  return (
    <div className="relative inline-block cursor-pointer" ref={containerRef}>
      <div onClick={toggleClickInside}>
        <AccountCircle />
      </div>
      <div
        className={`${
          !clickOutside ? 'block' : 'hidden'
        } absolute z-10 shadow min-w-full bg-gray-100 right-0 dark:bg-gray-900 ring-2 ring-blue-500 ring-opacity-50 dark:ring-gray-100 rounded-sm`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Dropdown;
