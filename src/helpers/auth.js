import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import LoadingScreen from '../components/layout/Warnings/Spinner';

const locationHelper = locationHelperBuilder({});

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  // eslint-disable-next-line max-len, no-unused-vars
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) => !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && !auth.isEmpty,
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: LoadingScreen,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // eslint-disable-next-line max-len
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) => !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && auth.isEmpty,
});
