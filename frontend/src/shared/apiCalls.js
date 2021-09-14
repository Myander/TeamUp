import axios from 'axios';

export const loginCall = async (userCredentials, dispatch, login) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email: userCredentials.email,
      password: userCredentials.password,
    });
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    login(res.data.userId, res.data.token, res.data.username);
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};
