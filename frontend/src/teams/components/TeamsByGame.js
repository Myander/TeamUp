import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from './Team';

// const teams = [
//   {
//     title: 'TEST',
//     description: 'Describe the team purpose',
//     game: 'Grand Theft Auto V',
//     private: false,
//   },
//   {
//     title: 'TEST',
//     description: 'Describe the team purpose',
//     game: 'Grand Theft Auto V',
//     private: false,
//   },
//   {
//     title: 'TEST',
//     description: 'Describe the team purpose',
//     game: 'Grand Theft Auto V',
//     private: false,
//   },
//   {
//     title: 'TEST',
//     description: 'Describe the team purpose',
//     game: 'Grand Theft Auto V',
//     private: false,
//   },
//   {
//     title: 'TEST',
//     description: 'Describe the team purpose',
//     game: 'Grand Theft Auto V',
//     private: false,
//   },
// ];

const TeamsByGame = ({ game }) => {
  const [teams, setTeams] = useState([]);
  console.log('game', game);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teams/name/${game}`)
      .then(res => {
        console.log(res.data.teams);
        setTeams(res.data.teams);
      })
      .catch(err => {
        console.log(err);
      });
  }, [game]);

  return (
    <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
      {teams.map((team, index) => (
        <Team team={team} key={index} />
      ))}
    </div>
  );
};

export default TeamsByGame;
