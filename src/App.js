import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// Store & helpers
import store from './store';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
// Components
import NavBar from './components/layout/NavBar';
import Home from './components/Home/Home';
// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Player
import Players from './components/players/Players';
import AddPlayer from './components/players/AddPlayer';
import PlayerDetails from './components/players/PlayerDetails';
import EditPlayer from './components/players/EditPlayer';
// Team
import Results from './components/team/Results';
import AddResult from './components/team/AddResult';
import Settings from './components/settings/Settings';
import About from './components/about/About';
import NotFound from './components/layout/NotFound';
import './App.css';
import EditResult from './components/team/EditResult';
import MatchDetails from './components/team/ResultsComponents/MatchDetails';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
            <Route exact path="/about" component={About} />
            <Route exact path="/players" component={Players} />
            <Route exact path="/players/addPlayer" component={UserIsAuthenticated(AddPlayer)} />
            <Route exact path="/players/edit/:id" component={UserIsAuthenticated(EditPlayer)} />
            <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
            <Route exact path="/players/:id" component={PlayerDetails} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/results/addResult" component={UserIsAuthenticated(AddResult)} />
            <Route exact path="/results/:id/edit" component={UserIsAuthenticated(EditResult)} />
            <Route exact path="/results/:id" component={MatchDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
