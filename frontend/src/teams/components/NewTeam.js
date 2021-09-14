import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Input2, TextArea2 } from 'user/components/Inputs';
import { CloseIcon } from 'icons/Icons';
import Loader from 'shared/components/Loader';

const NewTeam = ({ game, handleClose, addNewTeam, token }) => {
  const title = useRef();
  const description = useRef();
  const status = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    axios
      .post(
        'http://localhost:5000/api/teams/',
        {
          title: title.current.value,
          description: description.current.value,
          game: game,
          private: status.current.value === 'invite' ? true : false,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then(res => {
        addNewTeam(res.data.team);
        setLoading(false);
        title.current.value = '';
        description.current.value = '';
        handleClose();
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="mx-auto ring-2 ring-opacity-50 dark:ring-gray-100 shadow-md rounded">
      <form
        // ref={formRef}
        onSubmit={onSubmit}
        className="bg-white dark:bg-gray-900 dark:text-gray-50 text-center rounded pb-8 pt-2 px-5 w-72 md:w-96 mx-auto"
      >
        <div className="flex justify-end">
          <div
            className="cursor-pointer"
            onClick={handleClose.bind(null, false)}
          >
            <CloseIcon
              className="cursor-pointer"
              onClick={handleClose.bind(null, false)}
            />
          </div>
        </div>
        <div className="mb-4 w-full py-2 px-4">{game}</div>
        {/* {errors.title && <p>{errors.title.message}</p>}
        <Input
          placeholder="Title"
          {...register('title', { required: 'Title required.' })}
        /> */}
        <Input2 ref={title} placeholder="Title" required />
        {/* {errors.description && <p>{errors.description.message}</p>}
        <TextArea
          placeholder="Description"
          {...register('description', { required: 'description required.' })}
        /> */}
        <TextArea2 ref={description} placeholder="Description" required />
        {/* {errors.status && <p>{errors.title.status}</p>} */}
        <select
          // {...register('status')}
          ref={status}
          className="border-gray-300 dark:bg-gray-500 dark:text-gray-50 mb-4 w-full border-solid border rounded py-2 px-3 text-gray-400"
        >
          <option value="open" className="px-4">
            Open to all
          </option>
          <option value="invite" className="px-4">
            Invite only
          </option>
        </select>
        {error && <div>Failed to create team please try again.</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 
          focus:outline-none ring-4 ring-blue-500 ring-opacity-50 hover:ring-blue-700 
          text-white font-bold py-2 px-4 mx-4 mt-6 rounded transition duration-500 ease-out 
          transform hover:translate-y-1 hover:scale-110 active:scale-100 active:-translate-y-0"
        >
          {loading ? (
            <Loader height={6} width={8} mb={0} fill="white" />
          ) : (
            'Create Team'
          )}
        </button>
      </form>
    </div>
  );
};

export default NewTeam;
