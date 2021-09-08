import React from 'react';

export const Input = ({ type, placeholder }) => (
  <input
    type={type ? type : 'text'}
    placeholder={placeholder}
    className={`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
  />
);

export const Button = props => (
  <button
    type="submit"
    className={`bg-green-500 hover:bg-green-700 
    focus:outline-none ring-4 ring-green-500 ring-opacity-50 hover:ring-green-700 
    text-white font-bold py-2 px-4 rounded transition duration-500 ease-out 
    transform hover:translate-y-1 hover:scale-110 active:scale-100 active:-translate-y-0`}
  >
    {props.children}
  </button>
);

export const Modal = props => {
  const { openModal } = props;
  return (
    <div
      className={`${
        openModal ? 'visible' : 'invisible'
      } absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      {props.children}
    </div>
  );
};
