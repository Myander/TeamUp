import React from 'react';
import { ReactComponent as PersonIcon } from 'icons/person_outline_black_24dp.svg';
import { SmallButton } from 'shared/components/Buttons';

export const Team = ({ team }) => {
  return (
    <div className="mx-2 my-4 w-64 cursor-pointer shadow rounded px-5 py-7">
      <div className="truncate font-semibold text-2xl dark:text-white mb-2">
        {team.title}
      </div>
      <div className="text-gray-500 text-lg mb-4">{team.description}</div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <PersonIcon />
          <div className="text-center">{team.members.length}</div>
        </div>
        <SmallButton>Join</SmallButton>
      </div>
    </div>
  );
};

export const TeamLoading = () => {
  return (
    <div className="mx-2 my-4 w-64 animate-pulse shadow rounded px-5 py-7">
      <div className="h-4 w-44 bg-gray-300 dark:bg-gray-500"></div>
      <div className="h-4 my-4 bg-gray-300 dark:bg-gray-500"></div>
      <div className="flex justify-between">
        <div className="flex flex-col w-6">
          <div className="h-6 bg-gray-300 dark:bg-gray-500"></div>
          <div className="h-6 mt-2 bg-gray-300 dark:bg-gray-500"></div>
        </div>
        <div className="h-6 w-8 mt-6 bg-gray-300 dark:bg-gray-500"></div>
      </div>
    </div>
  );
};
