import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import PageContainer from 'shared/components/PageContainer';

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
            <div className="mb-2">{user.userName}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamDetailPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (!teamId) return;

    axios
      .get(`http://localhost:5000/api/teams/${teamId}`)
      .then(res => {
        console.log('team details', res.data.team);
        setTeam(res.data.team);
      })
      .catch(err => {
        console.log(err);
      });
  }, [teamId]);

  return (
    <PageContainer>
      {team ? (
        <div className="text-black dark:text-white p-12 lg:flex lg:flex-wrap lg:justify-around">
          <TeamDetails team={team} />
          <div className="lg:flex-grow dark:bg-gray-800 shadow mt-6 max-w-3xl p-4">
            CHAT
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </PageContainer>
  );
};

export default TeamDetailPage;
