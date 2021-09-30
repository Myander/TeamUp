import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import PageContainer from 'shared/components/PageContainer';
import Messenger from 'teams/components/Chat/Messenger';
import Loader from 'shared/components/Loader';
import { AuthContext } from 'shared/context/AuthContext';

const TeamDetails = ({ team }) => {
  return (
    <div className="max-w-xl">
      <div className="text-xl md:text-3xl text-black dark:text-white font-semibold">
        {team.title}
      </div>
      <div className="md:text-lg mt-1 text-gray-500 dark:text-gray-400">
        {team.game}
      </div>
      <div className="text-lg md:text-2xl mt-4 text-black dark:text-white">
        {team.description}
      </div>
      <div className="md:text-xl mt-6 text-black dark:text-white">
        <span className="mr-2 font-semibold">Status: </span>
        <span>{team.private ? 'application only' : 'open to all'}</span>
      </div>
      <div className="hidden lg:block ">
        <div className="md:text-xl mt-6 text-black dark:text-white font-semibold">
          Members:
        </div>
        <div className="shadow dark:bg-gray-800 rounded mt-4 px-2 py-4">
          {team.members.map(user => (
            <div className="mb-2" key={user._id}>
              {user.username}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const { username, userId, socket } = useContext(AuthContext);
  const [chatMembers, setChatMembers] = useState([]);

  // need to get the current number of users in the chat when first entering.
  // console.log('chat members:', chatMembers);

  useEffect(() => {
    if (!teamId) return;
    axios
      .get(`http://localhost:5000/api/teams/${teamId}`)
      .then(res => {
        // console.log('team:', res.data.team);
        setTeam(res.data.team);
      })
      .catch(err => {
        console.log(err);
      });
  }, [teamId]);

  useEffect(() => {
    if (team && team.members.length) {
      team.members.forEach(member => {
        if (member && member._id === userId) {
          if (socket) {
            socket.emit('joinTeamChat', { teamId, userId, username });
            socket.on('joinedChat', data => {
              // console.log('user joined chat:', data.chatMembers);
              setChatMembers(data.chatMembers);
            });
            socket.on('updatedChatUsers', data => {
              setChatMembers(data.chatMembers);
            });
          }
        }
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', { room: teamId });
      }
    };
  }, [team, socket, teamId, userId, username]);

  return (
    <PageContainer>
      {team ? (
        <div className="text-black dark:text-white p-12 lg:flex lg:flex-wrap lg:justify-around">
          <TeamDetails team={team} />
          <div className="lg:flex-grow dark:bg-gray-800 shadow mt-6 max-w-4xl rounded">
            <Messenger
              team={team}
              teamId={teamId}
              socket={socket}
              username={username}
              userId={userId}
              chatMembers={chatMembers}
            />
          </div>
        </div>
      ) : (
        <Loader height={8} width={10} mt={20} />
      )}
    </PageContainer>
  );
};

export default TeamDetailPage;
