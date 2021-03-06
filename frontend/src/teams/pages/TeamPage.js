import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Button } from 'shared/components/Buttons';
import { Modal } from 'shared/components/Modal';
import PageContainer from 'shared/components/PageContainer';
import NewTeam from 'teams/components/NewTeam';
import { useParams } from 'react-router-dom';
import { Teams, TeamsLoading } from 'teams/components/Teams';
import axios from 'axios';
import Loader from 'shared/components/Loader';
import useInfiniteScroll from 'shared/hooks/infiniteScroll-hook';
import { AuthContext } from 'shared/context/AuthContext';

const TeamPage = () => {
  const { userId, token } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(1);
  const [totalTeams, setTotalTeams] = useState(null);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();
  const teamsArraylength = teams.length;
  let game = name.split('-').join(' ');

  const addNewTeam = team => {
    //console.log('ADDING NEW TEAM');
    setTeams(currTeams => {
      const updatedTeams = [...currTeams];
      updatedTeams.push(team);
      return updatedTeams;
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
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/teams/game/${name}`)
      .then(res => {
        setTeams(res.data.teams);
        setTotalTeams(res.data.count);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [name]);

  const handleClick = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <PageContainer>
      <div className="flex items-center p-4 mt-6">
        {!!token && !loading && (
          <Button handleClick={handleClick}>New Team</Button>
        )}
      </div>
      {
        <Modal openModal={openModal} handleClose={setOpenModal}>
          <NewTeam
            game={game}
            handleClose={setOpenModal}
            addNewTeam={addNewTeam}
            token={token}
          />
        </Modal>
      }
      {teams.length ? (
        <Teams
          teams={teams}
          isLoggedIn={!!token}
          token={token}
          userId={userId}
        />
      ) : loading ? (
        <TeamsLoading />
      ) : (
        <div className="text-black dark:text-white text-center mt-8 text-lg">
          No Teams. Trying making a new team!!
        </div>
      )}

      <div ref={targetRef}>
        {teamsArraylength && teamsArraylength < totalTeams && (
          <Loader height={8} width={10} mb={4} />
        )}
      </div>
    </PageContainer>
  );
};

export default TeamPage;
