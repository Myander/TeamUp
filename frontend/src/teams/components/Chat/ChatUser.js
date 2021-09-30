import React from 'react';

const ChatUser = ({ username }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="flex items-center cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded p-2 mt-2">
      <img
        className="w-12 h-12 rounded-full object-fill mr-4"
        src={`${PF}Metal-Door.jpeg`}
        alt="profile"
      />
      <span className="text-black dark:text-white">{username}</span>
    </div>
  );
};

export default ChatUser;
