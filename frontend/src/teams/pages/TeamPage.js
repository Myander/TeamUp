import React, { useState } from 'react';
import { Button } from '../../shared/components/Buttons';
import { Modal } from '../../shared/components/Modal';
import PageContainer from '../../shared/components/PageContainer';
import NewTeam from '../components/NewTeam';
import { useParams } from 'react-router-dom';
import TeamsByGame from '../components/TeamsByGame';

const TeamPage = () => {
  const [openModal, setOpenModal] = useState(false);
  let params = useParams();
  let game = params.name.split('-').join(' ');

  const handleClick = () => {
    setOpenModal(prevState => !prevState);
  };

  return (
    <PageContainer>
      <div className="flex items-center p-4">
        <Button handleClick={handleClick}>New Team</Button>
      </div>
      <Modal openModal={openModal}>
        <NewTeam game={game} />
      </Modal>
      <TeamsByGame game={params.name} />
    </PageContainer>
  );
};

export default TeamPage;
