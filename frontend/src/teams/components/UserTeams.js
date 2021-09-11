import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from 'shared/components/Tooltip';
import useDelayedHoverEffect from 'shared/hooks/delayedHoverEffect-hook';
import PageLink from 'shared/components/PageLink';

const Team = ({ team, handleCloseDrawer }) => {
  const { active, handleMouseEnter, handleMouseLeave } =
    useDelayedHoverEffect();

  return (
    <PageLink to={`/team/${team._id}`}>
      <div
        className="relative shadow rounded mb-4 dark:bg-gray-800 p-2 cursor-pointer overflow-ellipsis"
        onClick={handleCloseDrawer}
      >
        <div
          className="text-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {team.title}
        </div>
        {/* <div className="text-gray-400">{team.description}</div> */}
        <div className="text-gray-600 dark:text-gray-400">{team.game}</div>
        <Tooltip active={active}>
          <div>{team.title}</div>
          <div>{team.description}</div>
        </Tooltip>
      </div>
    </PageLink>
  );
};

const UserTeams = ({ auth, handleCloseDrawer }) => {
  const { userId } = auth;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (!userId) return;
    // if (!open) return
    axios
      .get(`http://localhost:5000/api/teams/user/${userId}`)
      .then(res => {
        console.log('res', res.data.user.teams);
        setTeams(res.data.user.teams);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div>
      <div className="font-bold my-6 text-lg underline">My Teams</div>
      <div>
        {teams.length
          ? teams.map(team => (
              <Team
                key={team._id}
                team={team}
                handleCloseDrawer={handleCloseDrawer}
              />
            ))
          : 'Loading...'}
      </div>
    </div>
  );
};

export default UserTeams;
