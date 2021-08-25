import React from 'react';
import { Team, TeamLoading } from './Team';

export const Teams = ({ teams }) => {
  return (
    <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
      {teams.map(team => (
        <Team team={team} key={team._id} />
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
