import React, { useState, useRef, useCallback, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

const Search = () => {
  const containerRef = useRef();
  const [dropdown, setDropdown] = useState('invisible');
  const [games, setGames] = useState([]);
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

  const handleFocus = () => {
    console.log('focused');
    setDropdown('visible');
  };

  const handleClickOutSide = useCallback(
    event => {
      const target = event.target;
      if (containerRef.current && containerRef.current.contains(target)) {
        return;
      }
      setDropdown('invisible');
    },
    [setDropdown]
  );

  useEffect(() => {
    if (dropdown === 'visible') {
      document.addEventListener('click', handleClickOutSide, false);
    } else {
      document.removeEventListener('click', handleClickOutSide, false);
    }
    return () => {
      document.removeEventListener('click', handleClickOutSide, false);
    };
  }, [dropdown, handleClickOutSide]);

  const SearchItem = ({ image, title }) => (
    <div className={`flex hover:bg-gray-600 my-0.5 cursor-pointer`}>
      <div className="flex-shrink-0 mr-1">
        <img
          className="h-8 w-8 mx-1 object-cover bg-red-400"
          src={image}
          alt={title}
        />
      </div>
      <div className="text-xl font-medium text-black">{title}</div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative inline-block mx-3"
      onClick={handleFocus}
    >
      <input
        onChange={_.debounce(handleChange, 300, {
          leading: true,
          trailing: true,
        })}
        // onBlur={handleBlur}
        placeholder="Search"
        className="block border border-transparent focus:outline-none rounded
      focus:ring-2 focus:ring-purple-600 focus:border-transparent 
      shadow-inner bg-gray-100 w-96 p-1"
      ></input>
      <div
        className={`absolute bg-gray-400 rounded shadow-sm p-1 w-96 my-0.5 ${dropdown}`}
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
          <div>loading..</div>
        )}
      </div>
    </div>
  );
};

export default Search;
