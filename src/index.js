import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StoreProvider } from 'easy-peasy';
import store from './store/configureStore';
import App from './components/App';

ReactDOM.render(
  <StoreProvider store={store}>
		<App />
	</StoreProvider>,
  document.getElementById('root')
);

