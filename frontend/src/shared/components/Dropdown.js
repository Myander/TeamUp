import React from 'react';
import useClickOutside from 'shared/hooks/clickOutside-hook';

const Dropdown = props => {
  const { containerRef, clickOutside, toggleClickInside } = useClickOutside();

  return (
    <div className="relative inline-block cursor-pointer" ref={containerRef}>
      <div
        className="rounded-full bg-gray-500 w-12 h-12"
        onClick={toggleClickInside}
      ></div>
      <div
        className={`${
          !clickOutside ? 'block' : 'hidden'
        } absolute z-10 shadow min-w-full bg-gray-100 p-4 right-0 dark:bg-gray-500 rounded-sm`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Dropdown;
