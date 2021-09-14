import React from 'react';

const Message = ({ own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={`flex flex-col mt-5`}>
      <div
        className={`flex items-center ${own ? 'justify-end' : 'justify-start'}`}
      >
        <img
          src={`${PF}Metal-Door.jpeg`}
          alt="profile"
          className="w-12 h-12 rounded-full object-fill mr-4"
        />
        <p
          className={`p-2 rounded-2xl max-w-sm ${
            own ? 'bg-gray-300 text-black' : 'bg-blue-600 text-white'
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis id
          placeat, inventore, doloribus sit sed optio, harum accusantium.
        </p>
      </div>
      <div className={`font-xs mt-2 ${own ? 'text-right' : 'text-left'}`}>
        1 hour ago
      </div>
    </div>
  );
};

export default Message;
