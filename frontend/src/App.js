import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Navbar from './shared/components/Navbar';
import GameDirectory from './teams/pages/GameDirectory';
import TeamPage from './teams/pages/TeamPage';
import Login from './user/pages/Login';
import SignUp from './user/pages/SignUp';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { login, logout, userToken, userId } = useAuth();

  // let routes;

  // if (isLoggedIn) {
  //   routes = ();
  // } else {
  //   routes = ();
  // }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userToken,
        token: userToken,
        userId,
        login,
        logout,
      }}
    >
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <GameDirectory />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/teams/:name">
            <TeamPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
