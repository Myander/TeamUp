import React from 'react';
import ReactDOM from 'react-dom';
import useEscKeyPress from 'shared/hooks/escKeyPress-hook';

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
  const { openModal, handleClose } = props;

  useEscKeyPress(handleClose.bind(null, false), openModal);

  return ReactDOM.createPortal(
    <div
      className={`${
        openModal ? 'visible' : 'invisible'
      } absolute z-50 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3`}
    >
      {props.children}
    </div>,
    document.getElementById('modal-hook')
  );
};
