import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: null,
  login: null,
  logout: null,
  token: null,
  userId: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
  login,
  logout,
  token,
  userId,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        login,
        logout,
        token,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
