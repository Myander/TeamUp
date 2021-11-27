import React from 'react';

export const Button = props => (
  <button
    onClick={props.handleClick}
    className={`bg-blue-500 hover:bg-blue-700 
    focus:outline-none ring-4 ring-blue-500 ring-opacity-50 hover:ring-blue-700 
    text-white font-bold py-2 px-4 mx-4 rounded transition duration-500 ease-out 
    transform hover:translate-y-1 hover:scale-110 active:scale-100 active:-translate-y-0`}
  >
    {props.children}
  </button>
);
export const DefaultButton = props => (
  <button
    onClick={props.handleClick}
    className={`bg-blue-500 hover:bg-blue-700 
    focus:outline-none ring-4 ring-blue-500 ring-opacity-50 hover:ring-blue-700 
    text-white font-semibold pt-1 pb-1.5 px-3 ml-4 rounded transition duration-500 ease-out 
    `}
  >
    {props.children}
  </button>
);

export const SmallButton = props => (
  <button
    onClick={props.handleClick}
    disabled={props.disabled}
    className={`bg-blue-500 hover:bg-blue-700 disabled:opacity-30 disabled:hover:bg-blue-500 disabled:cursor-default 
  text-white font-semibold py-0.5 px-5 ml-4 rounded transition duration-500 ease-out 
  `}
  >
    {props.children}
  </button>
);
