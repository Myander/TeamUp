import React, { useState, useEffect, useRef } from 'react';
import Message from 'teams/components/Chat/Message';
import ChatUser from 'teams/components/Chat/ChatUser';
import axios from 'axios';
import Loader from 'shared/components/Loader';

const Messenger = ({ teamId, socket, username, userId, chatMembers }) => {
  const [messages, setMessages] = useState([]);
  // const [error, setError] = useState(null);
  const textRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (!teamId) return;

    axios
      .get(`http://localhost:5000/api/messages/${teamId}`)
      .then(res => {
        setMessages(res.data.messages);
      })
      .catch(err => {
        console.log(err);
        // setError('No messages found!!');
      });
  }, [teamId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', message => {
        console.log('new message', message._id);
        setMessages(prevMessages => {
          const appendedMessages = [...prevMessages];
          appendedMessages.push({ ...message });
          return appendedMessages;
        });
      });
    }
  }, [socket]);

  const handleSumbit = e => {
    e.preventDefault();

    // socket.emit('chatMessage', {
    //   teamId,
    //   userId,
    //   username,
    //   text: textRef.current.value,
    // });

    axios
      .post('http://localhost:5000/api/messages', {
        teamId,
        senderId: userId,
        text: textRef.current.value,
        senderUsername: username,
      })
      .then(res => {
        //console.log(res.data.message);
        // console.log('new message', res.data.message);
        // setMessages(prevMessages => {
        //   const appendedMessages = [...prevMessages];
        //   appendedMessages.push({ ...res.data.message, sender: { username } });
        //   return appendedMessages;
        // });
      })
      .catch(err => {
        console.log(err);
      });

    textRef.current.value = '';
  };

  return (
    <div className="flex h-96 md:h-tall">
      <div className="w-28 md:w-48 pt-2 overflow-y-scroll">
        {chatMembers ? (
          chatMembers.map(member => (
            <ChatUser username={member.username} key={member.userId} />
          ))
        ) : (
          <Loader height={8} width={10} mt={20} />
        )}
      </div>
      <div className="flex-grow p-2 mb-2">
        <div className="px-3 h-4/5 overflow-y-auto">
          {messages.length ? (
            messages.map(message => (
              <Message key={message._id} message={message} />
            ))
          ) : (
            <Loader height={8} width={10} mt={20} />
          )}
          <div ref={scrollRef} />
        </div>
        <form onSubmit={handleSumbit}>
          <div className="mt-5 flex items-center pl-3">
            <textarea
              ref={textRef}
              required
              placeholder="Write something!"
              className="w-3/4 h-24 text-black dark:text-white shadow-inner bg-gray-100 dark:bg-gray-700 p-2 
            rounded resize-none placeholder-black dark:placeholder-gray-50"
            ></textarea>
            <button
              className="w-20 h-10 ml-4 cursor-pointer bg-green-500 text-white rounded"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messenger;
