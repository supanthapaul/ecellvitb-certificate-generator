import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from '../pages/Home';
import DashboardPage from '../pages/Dashboard';
import CertificatePage from '../pages/CertificatePage';
import PrivateRoute from './PrivateRoute';
import * as ROUTES from '../constants/routes';


const App = () => {
  return (
    <Router >
			<Navbar />
			<Route exact path={ROUTES.HOME} component={HomePage} />
      <PrivateRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
			<Route path="/certificate/:id" component={CertificatePage} />
		</Router>
  );
}

export default App;
