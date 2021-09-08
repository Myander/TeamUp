import React from 'react';
import { PersonOutline } from 'icons/Icons';
import { SmallButton } from 'shared/components/Buttons';
import useDelayedHoverEffect from 'shared/hooks/delayedHoverEffect-hook';
import Tooltip from 'shared/components/Tooltip';

export const Team = ({ team, isLoggedIn, handleClick }) => {
  const { active, handleMouseEnter, handleMouseLeave } =
    useDelayedHoverEffect();

  return (
    <div className="relative mx-2 my-4 w-64 cursor-pointer shadow dark:bg-gray-800 rounded px-5 py-7">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="truncate font-semibold text-2xl dark:text-white mb-2">
          {team.title}
        </div>
        <div
          className={`text-gray-500 dark:text-gray-300 text-lg mb-5 truncate`}
        >
          {team.description}
        </div>
        <Tooltip active={active} pos="1/3">
          <div className="font-semibold">{team.title}</div>
          <div>{team.description}</div>
        </Tooltip>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <PersonOutline />
          <div className="text-center text-black dark:text-white">
            {team.members.length}
          </div>
        </div>
        {
          <SmallButton
            disabled={isLoggedIn}
            handleClick={handleClick.bind(null, team)}
          >
            Join
          </SmallButton>
        }
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
