import React, { useCallback } from 'react';
import { Team, TeamLoading } from './Team';
import axios from 'axios';

export const Teams = ({ teams, isLoggedIn, token, userId }) => {
  const handleJoinTeam = useCallback(
    (team, member, handleAddMember) => {
      // do not allow members to join more than once
      if (member) {
        console.log('already in the team!');
        return;
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
          console.log('res', res); // update UI to show membership in the team.
          handleAddMember(); // need to update member count as well (refactor this)
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, userId]
  );

  const handleApplyToTeam = team => {
    console.log('team', team);
  };

  return (
    <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
      {teams.map(team => (
        <Team
          team={team}
          key={team._id}
          isLoggedIn={isLoggedIn}
          handleJoinTeam={handleJoinTeam}
          handleApplyToTeam={handleApplyToTeam}
          userId={userId}
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
