import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StoreProvider } from 'easy-peasy';
import store from './store/configureStore';
import App from './components/App';

ReactDOM.render(
  <StoreProvider store={store}>
		<div className="container">
			<App />
		</div>
	</StoreProvider>,
  document.getElementById('root')
);

