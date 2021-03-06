import 'react-dates/initialize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { startSetBlogs, startSetBlogsPublic } from './actions/blogs';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetBlogs()).then(() => {
      renderApp();
      if (history.location.pathname === '/login') { // if we are on login page and logged in redirect to dashboard
        history.push('/dashboard');
      }
    })
    
  } else {
    store.dispatch(logout());

    store.dispatch(startSetBlogsPublic()).then(() => {
      renderApp();
      // history.push('/');
    })
  }
});