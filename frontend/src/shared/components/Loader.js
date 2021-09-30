import React from 'react';

const Loader = ({ height, width, mb, fill, mt }) => {
  return (
    <svg
      className={`fill-current text-blue animate-spin h-${height} w-${width} mx-auto mb-${
        mb ? mb : 0
      } mt-${mt ? mt : 0}`}
      viewBox="0 0 24 24"
    >
      <path
        fill={fill ? fill : 'blue'}
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Loader;
