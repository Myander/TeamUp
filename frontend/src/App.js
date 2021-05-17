import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Navbar from './shared/components/Navbar';
import GameDirectory from './teams/pages/GameDirectory';
import SignUp from './user/pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <GameDirectory />
        </Route>
        <Route path="/auth">
          <SignUp />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
