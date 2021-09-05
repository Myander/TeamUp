import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from 'shared/context/auth-context';
import { Input } from 'user/components/Inputs';
import PageContainer from 'shared/components/PageContainer';
import { Redirect } from 'react-router-dom';
import Loader from 'shared/components/Loader';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log('loading....');
    setLoading(true);
    axios
      .post('http://localhost:5000/api/users/login', {
        email: data.email,
        password: data.password,
      })
      .then(res => {
        console.log('DONE!!');
        setLoading(false);
        auth.login(res.data.userId, res.data.token);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {auth.isLoggedIn && <Redirect to="/" />}
      <PageContainer>
        <div className="py-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 dark:text-gray-50 text-center rounded py-8 px-5 shadow max-w-xs mx-auto"
          >
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              placeholder="Email"
              {...register('email', { required: 'Email required.' })}
            />

            {errors.password && <p>{errors.password.message}</p>}
            <Input
              placeholder="Password"
              type="password"
              {...register('password', {
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
                'Login'
              )}
            </button>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
