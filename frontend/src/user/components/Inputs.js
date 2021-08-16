import React, { forwardRef } from 'react';

export const Input = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      type={props.type ? props.type : 'text'}
      placeholder={props.placeholder}
      className="border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4"
    />
  );
});
