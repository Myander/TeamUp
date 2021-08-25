import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'shared/components/Buttons';
import { Modal } from 'shared/components/Modal';
import PageContainer from 'shared/components/PageContainer';
import NewTeam from 'teams/components/NewTeam';
import { useParams } from 'react-router-dom';
import { Teams, TeamsLoading } from 'teams/components/Teams';
import axios from 'axios';
import Loader from 'shared/components/Loader';
import useInfiniteScroll from 'shared/hooks/infiniteScroll-hook';

const TeamPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTeams, setTotalTeams] = useState(null);
  const { name } = useParams();
  const teamsArraylength = teams.length;
  let game = name.split('-').join(' ');

  const addNewTeam = team => {
    setTeams(currTeams => {
      const updateTeams = [...currTeams];
      updateTeams.push(team);
      return updateTeams;
    });
  };

  const getMoreTeams = useCallback(() => {
    if (totalTeams === teamsArraylength) return;
    let nextPage = page + 1;
    axios
      .get(`http://localhost:5000/api/teams/game/${name}?page=${nextPage}`)
      .then(res => {
        setPage(prev => prev + 1);
        setTeams(prevTeams => [...prevTeams, ...res.data.teams]);
        setTotalTeams(res.data.count);
      })
      .catch(err => {
        console.log(err);
      });
  }, [name, page, totalTeams, teamsArraylength]);

  const { targetRef } = useInfiniteScroll(getMoreTeams);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/teams/game/${name}`)
      .then(res => {
        // console.log('result: ', res);
        setTeams(res.data.teams);
        setTotalTeams(res.data.count);
      })
      .catch(err => {
        console.log(err);
      });
  }, [game, name]);

  const handleClick = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <PageContainer>
      <div className="flex items-center p-4">
        <Button handleClick={handleClick}>New Team</Button>
      </div>
      <Modal openModal={openModal}>
        <NewTeam
          game={game}
          handleClose={setOpenModal}
          addNewTeam={addNewTeam}
        />
      </Modal>
      {/* <TeamsLoading /> */}
      {teams.length ? <Teams teams={teams} /> : <TeamsLoading />}
      <div ref={targetRef}>{teamsArraylength < totalTeams && <Loader />}</div>
    </PageContainer>
  );
};

export default TeamPage;
