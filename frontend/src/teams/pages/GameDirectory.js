import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Game, GameLoading } from 'teams/components/Game';
import Loader from 'shared/components/Loader';
import useInfiniteScroll from 'shared/hooks/infiniteScroll-hook';
import PageContainer from 'shared/components/PageContainer';

const GameDirectory = () => {
  const [games, setGames] = useState([]);
  const isLoading = useRef(false);
  const [next, setNext] = useState('');

  const fetchMoreGames = useCallback(() => {
    if (!isLoading.current) {
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
  }, [next]);

  const { targetRef } = useInfiniteScroll(fetchMoreGames);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://api.rawg.io/api/games?page_size=25&key=25b4d5b424a243bdb3d34fcc2ec2807d',
    };
    isLoading.current = true;
    axios
      .request(options)
      .then(res => {
        // console.log(res.data);
        setGames(res.data.results);
        setNext(res.data.next);
        isLoading.current = false;
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <PageContainer>
      <div className="flex flex-wrap justify-center max-w-6xl mx-auto py-4">
        {games.length
          ? games.map(game => <Game key={game.id} game={game} />)
          : new Array(25)
              .fill(0)
              .map((item, index) => <GameLoading key={index} />)}
        {/* {new Array(25).fill(0).map((item, index) => (
          <GameLoading key={index} />
        ))} */}
      </div>
      <div ref={targetRef}>
        <Loader height={8} width={10} mb={0} />
      </div>
    </PageContainer>
  );
};

export default GameDirectory;
