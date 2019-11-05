import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
// MUI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
// Icons
import './assets/icons/fontawesome';
// Routes
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    primary: { main: red[700] },
    secondary: {
      main: orange[500],
      contrastText: '#222',
    },
    text: { primary: '#111' },
  },
  typography: { fontFamily: 'Varela Round', useNextVariants: true },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,

  document.getElementById('root'),
);
registerServiceWorker();
