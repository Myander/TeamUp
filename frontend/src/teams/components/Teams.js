import React, { useCallback } from 'react';
import { Team, TeamLoading } from './Team';
import axios from 'axios';

export const Teams = ({ teams, isLoggedIn, token, userId }) => {
  const handleJoinTeam = useCallback(
    team => {
      // do not allow members to join more than once
      for (let i = 0; i < team.members.length; i++) {
        if (userId === team.members[i]) {
          console.log('User Already in team!'); // maybe display popup
          return;
        }
      }

      const updatedMembers = [...team.members];
      updatedMembers.push(userId);
      axios
        .patch(
          `http://localhost:5000/api/teams/${team._id}`,
          {
            ...team,
            members: updatedMembers,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        )
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, userId]
  );

  return (
    <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
      {teams.map(team => (
        <Team
          team={team}
          key={team._id}
          isLoggedIn={isLoggedIn}
          handleClick={handleJoinTeam}
        />
      ))}
    </div>
  );
};

export const TeamsLoading = () => {
  return (
    <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
      {new Array(20).fill(0).map((item, index) => (
        <TeamLoading key={index} />
      ))}
    </div>
  );
};
