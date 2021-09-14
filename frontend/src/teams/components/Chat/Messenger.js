import React from 'react';
import Message from 'teams/components/Chat/Message';
import Conversation from 'teams/components/Chat/Conversation';

const Messenger = () => {
  return (
    <div className="flex h-96 md:h-tall">
      <div className="w-28 md:w-48 pt-2 overflow-y-auto">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
      <div className="flex-grow p-2">
        <div className="px-3 h-4/5 overflow-y-auto">
          <Message />
          <Message own />
          <Message />
          <Message own />
        </div>
        <div className="mt-5 flex items-center pl-3">
          <textarea
            placeholder="Write something!"
            className="w-3/4 h-24 text-black dark:text-white shadow-inner bg-gray-100 dark:bg-gray-700 p-2 
            rounded resize-none placeholder-black dark:placeholder-gray-50"
          ></textarea>
          <button className="w-20 h-10 ml-4 cursor-pointer bg-green-500 text-white rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
