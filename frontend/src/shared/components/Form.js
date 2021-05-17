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

export const Form = props => {
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white text-center rounded py-8 px-5 shadow max-w-xs mx-auto my-4`}
    >
      {props.children}
    </form>
  );
};
