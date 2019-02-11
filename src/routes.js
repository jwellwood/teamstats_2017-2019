import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Auth
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Player
import Players from './containers/Players';
import AddPlayerForm from './components/Pages/Forms/Squad/AddPlayerForm';
import PlayerUpdater from './containers/PlayerUpdater';
import EditPlayer from './components/Pages/Squad/EditPlayer/EditPlayer';
import EditImage from './components/Pages/Squad/EditPlayer/EditImage';
// Results
import Results from './containers/Results';
import AddResultForm from './components/Pages/Forms/Results/AddResultForm';
import ResultUpdater from './containers/ResultUpdater';
import EditResult from './components/Pages/Forms/Results/EditResult';
// Team
import TeamHome from './containers/TeamHome';
import EditTeam from './components/Pages/Home/EditTeam/EditTeam';
import AddTrophy from './components/Pages/Home/Trophies/AddTrophy';
// Other
import NavBar from './containers/NavBar';
import Settings from './containers/Settings';
import About from './components/Pages/About/About';
import NotFound from './components/layout/Warnings/NotFound';
import './App.css';
import StatsContainer from './containers/StatsContainer';

const Routes = () => (
  <div className="App">
    <NavBar />
    <div>
      <Switch>
        <Route exact path="/" component={TeamHome} />
        <Route exact path="/editteam" component={UserIsAuthenticated(EditTeam)} />
        <Route exact path="/addtrophy" component={UserIsAuthenticated(AddTrophy)} />
        <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
        <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
        <Route exact path="/about" component={About} />
        <Route exact path="/players" component={Players} />
        <Route exact path="/stats" component={StatsContainer} />
        <Route exact path="/players/addPlayer" component={UserIsAuthenticated(AddPlayerForm)} />
        <Route exact path="/players/edit/:id" component={UserIsAuthenticated(EditPlayer)} />
        <Route exact path="/players/edit/image/:id" component={UserIsAuthenticated(EditImage)} />
        <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
        <Route exact path="/players/:id" component={UserIsAuthenticated(PlayerUpdater)} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/results/addResult" component={UserIsAuthenticated(AddResultForm)} />
        <Route exact path="/results/:id/edit" component={UserIsAuthenticated(EditResult)} />
        <Route exact path="/results/:id" component={ResultUpdater} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default Routes;
