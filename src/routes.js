import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Auth
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Player
import Players from './components/Pages/Squad/Players';
import AddPlayerForm from './components/Pages/Squad/Forms/AddPlayerForm';
import PlayerUpdater from './components/Pages/Squad/PlayerUpdater';
import EditPlayer from './components/Pages/Squad/Forms/EditPlayer';
import EditImage from './components/Pages/Squad/Forms/EditImage';
// Results
import Results from './components/Pages/Results/Results';
import AddResultForm from './components/Pages/Results/Forms/AddResultForm';
import ResultDetails from './components/Pages/Results/ResultDetails';
import EditResult from './components/Pages/Results/Forms/EditResult';
// Team
import Home from './components/Pages/Home';
import EditTeam from './components/Pages/Home/EditTeam/EditTeam';
import AddTrophy from './components/Pages/Home/Details/Trophies/AddTrophy';
import StatsContainer from './components/Pages/Stats/StatsContainer';
// Other
import NavBar from './components/NavBar/NavBar';
import Settings from './components/Pages/Settings/Settings';
import About from './components/Pages/About';
import NotFound from './components/layout/Warnings/NotFound';
import './assets/styles/App.css';
import AddMatchPlayers from './components/Pages/Results/Forms/AddMatchPlayers';

const Routes = () => (
  <div className="App">
    <NavBar />
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
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
        <Route exact path="/results/:id" component={ResultDetails} />
        <Route
          exact
          path="/results/:id/add_details"
          component={UserIsAuthenticated(AddMatchPlayers)}
        />
        <Route exact path="/results/:id/edit" component={UserIsAuthenticated(EditResult)} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default Routes;
