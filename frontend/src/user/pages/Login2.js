import React, { useContext, useRef } from 'react';
import { Input2 } from 'user/components/Inputs';
import PageContainer from 'shared/components/PageContainer';
import Loader from 'shared/components/Loader';
import { loginCall } from 'shared/apiCalls';
import { AuthContext } from 'shared/context/AuthContext';

export default function Login() {
  const { isFetching, error, dispatch, login } = useContext(AuthContext);
  const password = useRef();
  const email = useRef();

  const onSubmit = e => {
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch,
      login
    );
  };

  return (
    <>
      <PageContainer>
        <div className="py-12">
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-gray-800 dark:text-gray-50 text-center rounded py-8 px-5 shadow max-w-xs mx-auto"
          >
            <Input2 ref={email} required type="email" placeholder="Email" />
            <Input2
              ref={password}
              required
              type="password"
              placeholder="Password"
              minLength="5"
            />
            {error && <div>No user found.</div>}
            <button
              type="submit"
              disabled={isFetching}
              className="bg-blue-500 hover:bg-blue-700 
          focus:outline-none ring-4 ring-blue-500 ring-opacity-50 hover:ring-blue-700 
          text-white font-bold py-2 px-4 mx-4 rounded transition duration-500 ease-out 
          transform hover:translate-y-1 hover:scale-110 active:scale-100 active:-translate-y-0 mt-6"
            >
              {isFetching ? (
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
