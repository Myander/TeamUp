import React from 'react';
import { format } from 'timeago.js';

const Message = ({ message }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //console.log(message.createdAt);
  return (
    <div className={`flex flex-col mt-6`}>
      <div className={`flex items-center`}>
        <img
          src={`${PF}Metal-Door.jpeg`}
          alt="profile"
          className="w-12 h-12 rounded-full object-fill mr-4"
        />
        <div>
          <div className="flex">
            <div className="text-green-500 mr-3">{message.senderUsername}</div>
            <div className="text-gray-400">{format(message.createdAt)}</div>
          </div>
          <p className={`p-2 rounded-2xl max-w-md text-black dark:text-white`}>
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
