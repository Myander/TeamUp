import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import GameDirectory from 'teams/pages/GameDirectory';
import TeamPage from 'teams/pages/TeamPage';
import Login from 'user/pages/Login';
import SignUp from 'user/pages/SignUp';
import { AuthContext } from 'shared/context/auth-context';
import { useAuth } from 'shared/hooks/auth-hook';
import MainNavigation from 'shared/components/Navigation/MainNavigation';
import TeamDetailPage from 'teams/pages/TeamDetailPage';

function App() {
  const { login, logout, userToken, userId } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  let routes;

  // const UserData = JSON.parse(localStorage.getItem('userData'));
  // const isLoggedIn = UserData ? UserData.isLoggedIn : false;
  // useEffect(() => {
  //   console.log('userToken', userToken);
  // }, [userToken]);

  // console.log('isLoggedIn: ', isLoggedIn);

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
        <MainNavigation />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
