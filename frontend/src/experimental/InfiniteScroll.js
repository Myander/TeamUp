import React, { useCallback, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Game, GameLoading } from '../teams/components/Game';
import Loader from '../shared/components/Loader';

const InfiniteScroll = () => {
  const [games, setGames] = useState([]);
  const isLoading = useRef(false);
  const [next, setNext] = useState('');
  const targetRef = useRef();

  const cb = useCallback(entries => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading.current) {
      console.log('making request');
      const options = {
        method: 'GET',
        url: next,
      };
      isLoading.current = true;
      axios
        .request(options)
        .then(res => {
          if (res.data.results) {
            setGames(prevList => [...prevList, ...res.data.results]);
          }
          if (res.data.next) {
            setNext(res.data.next);
          }
          isLoading.current = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.rawg.io/api/games?page_size=25&key=25b4d5b424a243bdb3d34fcc2ec2807d',
    };
    isLoading.current = true;
    axios
      .request(options)
      .then(res => {
        console.log(res.data);
        setGames(res.data.results);
        setNext(res.data.next);
        isLoading.current = false;
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    let observer = new IntersectionObserver(cb, options);
    observer.observe(targetRef.current);
    return () => observer.unobserve(targetRef.current);
  }, [targetRef, cb]);

  return (
    <>
      <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
        {games.length
          ? games.map((game, index) => <Game key={index} game={game} />)
          : Array(25)
              .fill(0)
              .map((item, index) => <GameLoading key={index} />)}
      </div>
      <div ref={targetRef}>
        <Loader />
      </div>
    </>
  );
};

export default InfiniteScroll;
