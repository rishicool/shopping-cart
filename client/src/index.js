import React,{Component}from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import Main from './components/Main';
import './assets/css/main.scss';
import persist from './config/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const persistStore = persist();
global.ENV = {
  PORT: 1234,
  HOST: 'localhost:8000',
  
  BASE_URL: 'http://localhost:8000/api/',
  
  SOCKET_URL: 'localhost:8000',
  WEBSITE_TITLE: 'Shopping Cart',
  WEBSITE_THEME: 'Shopping Made Easy. ',
  ADMIN_EMAIL: 'admin@myapp.com',
  MAILER_SERVICE: 'gmail',
  SOCKET_PORT: 1235,
  APP_LANGUAGE: "en",
  USER_COLORS: [
    '#4ca3dd',
    '#bada55',
    '#f7347a',
    '#ffa500',
    '#ff7373',
    '#5ac18e',
    '#008080',
    '#800080',
  ],
};
class App extends Component {
 
  render() {
    return (
      <Provider store={persistStore.store}>
        
          <Main />
        
      </Provider>
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

