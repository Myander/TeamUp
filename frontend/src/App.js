import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import GameDirectory from 'teams/pages/GameDirectory';
import TeamPage from 'teams/pages/TeamPage';
import Login from 'user/pages/Login2';
import SignUp from 'user/pages/Signup2';
import { AuthContextProvider } from 'shared/context/AuthContext';
import { useAuth } from 'shared/hooks/auth-hook';
import MainNavigation from 'shared/components/Navigation/MainNavigation';
import TeamDetailPage from 'teams/pages/TeamDetailPage';

function App() {
  const { login, logout, userToken, userId } = useAuth();
  let routes;

  if (!!userToken) {
    routes = (
      <Switch>
        <Route exact path="/">
          <GameDirectory />
        </Route>
        <Route path="/teams/:name">
          <TeamPage />
        </Route>
        <Route path="/team/:teamId">
          <TeamDetailPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <GameDirectory />
        </Route>
        <Route path="/teams/:name">
          <TeamPage />
        </Route>
        <Route path="/team/:teamId">
          <TeamDetailPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContextProvider
      login={login}
      logout={logout}
      token={userToken}
      userId={userId}
    >
      <Router>
        <MainNavigation />
        {routes}
      </Router>
    </AuthContextProvider>
  );
}

export default App;
