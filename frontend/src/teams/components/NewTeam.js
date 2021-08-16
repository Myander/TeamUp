import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';
import { Input } from '../../user/components/Inputs';

const NewTeam = ({ game }) => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    axios
      .post(
        'http://localhost:5000/api/teams/',
        {
          title: data.title,
          description: data.description,
          game: game,
          private: data.invite ? true : false,
        },
        {
          headers: {
            Authorization: `bearer ${auth.token}`,
          },
        }
      )
      .then(res => {
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="py-10 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-center rounded py-8 px-5 shadow max-w-xs mx-auto my-4"
      >
        <div className="mb-4 w-full py-2 px-4">{game}</div>
        {errors.title && <p>{errors.title.message}</p>}
        <Input
          placeholder="Title"
          {...register('title', { required: 'Title required.' })}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <Input
          placeholder="Description"
          {...register('description', { required: 'description required.' })}
        />
        {errors.status && <p>{errors.title.status}</p>}
        <select
          {...register('status')}
          className="border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4 text-gray-400"
        >
          <option value="open">Open to all</option>
          <option value="invite">Invite only</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 
          focus:outline-none ring-4 ring-blue-500 ring-opacity-50 hover:ring-blue-700 
          text-white font-bold py-2 px-4 mx-4 mt-2 rounded transition duration-500 ease-out 
          transform hover:translate-y-1 hover:scale-110 active:scale-100 active:-translate-y-0"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default NewTeam;
