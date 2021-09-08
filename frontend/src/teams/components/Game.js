import React, { useState } from 'react';
import PageLink from 'shared/components/PageLink';
import Tooltip from 'shared/components/Tooltip';
import useDelayedHoverEffect from 'shared/hooks/delayedHoverEffect-hook';

export const Game = ({ game }) => {
  const slug = game.name.split(' ').join('-');
  const [hideImage, setHideImage] = useState(true);
  const { active, handleMouseEnter, handleMouseLeave } =
    useDelayedHoverEffect();

  const handleHideImage = () => {
    setHideImage(true);
  };

  return (
    <PageLink to={`teams/${slug}`}>
      <div className="relative mx-2 my-4 w-48 cursor-pointer">
        <img
          className="h-72 w-max object-cover rounded-sm transition duration-200 
        transform hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-md"
          src={game.background_image}
          onLoad={handleHideImage}
          hidden={hideImage}
          alt="background"
        />
        <div
          className="relative truncate font-semibold text-lg dark:text-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {game.name}
        </div>
        <Tooltip active={active} pos="3/4">
          {game.name}
        </Tooltip>
      </div>
    </PageLink>
  );
};

export const GameLoading = () => {
  return (
    <div className="mx-2 my-4 w-48 animate-pulse space-y-2 rounded-sm">
      <div className="h-72 bg-gray-300 dark:bg-gray-500"></div>
      <div className="h-4 w-44 bg-gray-300 dark:bg-gray-500"></div>
    </div>
  );
};
