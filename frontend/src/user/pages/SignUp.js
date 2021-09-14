import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Input } from 'user/components/Inputs';
import PageContainer from 'shared/components/PageContainer';
import { Redirect } from 'react-router-dom';
import Loader from 'shared/components/Loader';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    setLoading(true);
    axios
      .post('http://localhost:5000/api/users/signup', {
        userName: data.userName,
        email: data.email,
        password: data.password,
      })
      .then(res => {
        setSuccess(true);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {success && <Redirect to="/login" />}
      <PageContainer>
        <div className="py-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 dark:text-gray-50 text-center rounded py-8 px-5 shadow max-w-xs mx-auto my-4"
          >
            {errors.userName && <p>{errors.userName.message}</p>}

            <Input
              placeholder="Username"
              {...register('userName', { required: 'Username required.' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              placeholder="Email"
              {...register('email', {
                required: 'email required',
              })}
            />

            {errors.password && (
              <p>
                {errors.password.type === 'minLength'
                  ? 'minimum length is 5 characters'
                  : errors.password.message}
              </p>
            )}
            <Input
              placeholder="Password"
              type="password"
              {...register('password', {
                minLength: 5,
                required: 'password required.',
              })}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 
          focus:outline-none ring-4 ring-blue-500 ring-opacity-50 hover:ring-blue-700 
          text-white font-bold py-2 px-4 mx-4 mt-2 rounded transition duration-500 ease-out 
          transform hover:translate-y-1 hover:scale-110 active:scale-100 active:-translate-y-0"
            >
              {loading ? (
                <Loader height={6} width={8} mb={0} fill="white" />
              ) : (
                'Signup'
              )}
            </button>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
