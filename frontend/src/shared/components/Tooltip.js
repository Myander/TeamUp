import React from 'react';

const Tooltip = props => {
  return (
    <div
      className={`absolute z-40 ${props.active ? 'visible' : 'invisible'} top-${
        props.pos ? props.pos : '1/2'
      } bg-white text-black text-center px-2 py-0.5 rounded-md shadow-xl`}
    >
      {props.children}
    </div>
  );
};

export default Tooltip;
