import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// Store & helpers
import store from './store';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';
// Components
import NavBar from './components/layout/Navs/NavBar';
import Home from './components/Pages/Home/Home';
// Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Player
import Players from './components/Pages/Squad/Players';
import AddPlayer from './components/Pages/Squad/AddPlayer/AddPlayer';
import PlayerUpdater from './components/Pages/Squad/UpdateStats/PlayerUpdater';
import EditPlayer from './components/Pages/Squad/EditPlayer/EditPlayer';
// Team
import Results from './components/Pages/Results/Results';
import AddResult from './components/Pages/Results/AddResult/AddResult';
import Settings from './components/Pages/Settings/Settings';
import About from './components/Pages/About/About';
import NotFound from './components/layout/Warnings/NotFound';
import './App.css';
import EditResult from './components/Pages/Results/EditResult/EditResult';
import ResultDetails from './components/Pages/Results/Result/ResultDetails';

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
            <Route exact path="/players/:id" component={UserIsAuthenticated(PlayerUpdater)} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/results/addResult" component={UserIsAuthenticated(AddResult)} />
            <Route exact path="/results/:id/edit" component={UserIsAuthenticated(EditResult)} />
            <Route exact path="/results/:id" component={ResultDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;
