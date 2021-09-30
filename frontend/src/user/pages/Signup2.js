import React, { useState } from 'react';
import axios from 'axios';
import { Input2 } from 'user/components/Inputs';
import PageContainer from 'shared/components/PageContainer';
import { Redirect } from 'react-router-dom';
import Loader from 'shared/components/Loader';
import { useRef } from 'react/cjs/react.development';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const repeatPassword = useRef();

  const onSubmit = e => {
    e.preventDefault();

    if (repeatPassword.current.value !== password.current.value) {
      repeatPassword.current.setCustomValidity("Passwords don't match!");
      setMismatch(true);
    } else {
      setMismatch(false);
      axios
        .post('http://localhost:5000/api/users/signup', {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        })
        .then(res => {
          setSuccess(true);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    }
  };

  const handleInput = e => {
    e.preventDefault();
    repeatPassword.current.setCustomValidity('');
  };

  return (
    <>
      {success && <Redirect to="/login" />}
      <PageContainer>
        <div className="py-10">
          <form
            onSubmit={onSubmit}
            className="bg-white dark:bg-gray-800 dark:text-gray-50 text-center rounded py-8 px-5 shadow max-w-xs mx-auto my-4"
          >
            <Input2 ref={username} placeholder="Username" required />
            <Input2 ref={email} placeholder="Email" required type="email" />

            <Input2
              ref={password}
              placeholder="Password"
              type="password"
              required
              minLength="5"
            />
            <Input2
              ref={repeatPassword}
              placeholder="Repeat password"
              type="password"
              required
              minLength="5"
              onInput={handleInput}
            />
            {error && <div>Failed to make account, please try again.</div>}
            {mismatch && <div>Password don't match!</div>}
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
                'Signup'
              )}
            </button>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
