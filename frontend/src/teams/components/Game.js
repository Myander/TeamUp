import React, { useState } from 'react';
import PageLink from '../../shared/components/PageLink';

export const Game = ({ game }) => {
  const slug = game.name.split(' ').join('-');
  const [hideImage, setHideImage] = useState(true);

  const handleHideImage = () => {
    setHideImage(true);
  };

  return (
    <PageLink to={`teams/${slug}`}>
      <div className="mx-2 my-4 w-48 cursor-pointer">
        {/* <div className="bg-blue-600"> */}
        <img
          className="h-72 w-max object-cover rounded-sm transition duration-200 
        transform hover:-translate-y-1.5 hover:translate-x-1.5 hover:shadow-md"
          src={game.background_image}
          onLoad={handleHideImage}
          hidden={hideImage}
          alt="background"
        />
        {/* </div> */}
        <div className="truncate font-semibold text-lg dark:text-white">
          {game.name}
        </div>
        <div>
          {/* {game.tags.map(tag => (
          <div key={tag.id}>{tag.name}</div>
        ))} */}
          {/* {game.short_screenshots.map(sc => (
          <img className="my-2" key={sc.id} src={sc.image} />
        ))} */}
        </div>
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
