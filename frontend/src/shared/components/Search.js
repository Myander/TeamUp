import React, { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import useClickOutside from 'shared/hooks/clickOutside-hook';

const Search = () => {
  const [games, setGames] = useState([]);
  const { containerRef, handleClickInside, clickOutside } = useClickOutside();

  const handleChange = e => {
    const options = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?page_size=8&key=25b4d5b424a243bdb3d34fcc2ec2807d&search=${e.target.value}`,
    };
    axios
      .request(options)
      .then(res => {
        console.log(res.data);
        setGames(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SearchItem = ({ image, title }) => (
    <div className={`flex hover:bg-gray-500 my-0.5 cursor-pointer`}>
      <div className="flex-shrink-0 mr-1">
        <img className="h-8 w-8 mx-1 object-cover" src={image} alt={title} />
      </div>
      <div className="text-xl font-medium text-black dark:text-gray-50">
        {title}
      </div>
    </div>
  );

  // const SearchItemLoading = () => (
  //   <div className="flex space-x-2 animate-pulse my-2">
  //     <div className="h-8 w-8 bg-gray-300" />
  //     <div className="h-4 w-36 bg-gray-300" />
  //   </div>
  // );

  return (
    <div
      ref={containerRef}
      className="relative inline-block mx-3"
      onClick={handleClickInside}
    >
      <input
        onChange={_.debounce(handleChange, 300, {
          leading: true,
          trailing: true,
        })}
        // onBlur={handleBlur}
        placeholder="Search"
        className="block border border-transparent focus:outline-none rounded
      focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black dark:text-gray-50 
      shadow-inner bg-gray-100 w-96 p-1 pl-4 dark:bg-gray-700 dark:placeholder-gray-50"
      ></input>
      <div
        className={`absolute bg-gray-50 dark:bg-gray-700 rounded shadow-sm p-1 w-96 my-0.5 z-50 dark:text-gray-50 ${
          clickOutside ? 'invisible' : 'visible'
        }`}
      >
        {games.length ? (
          games.map(game => (
            <SearchItem
              key={game.id}
              title={game.name}
              image={game.background_image}
            />
          ))
        ) : (
          <div>Search for a game!</div>
        )}
      </div>
    </div>
  );
};

export default Search;
