import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from '../pages/Home';
import DashboardPage from '../pages/Dashboard';
import CertificatePage from '../pages/CertificatePage';
import PrivateRoute from './PrivateRoute';
import * as ROUTES from '../constants/routes';


const App = () => {
  return (
    <Router >
			<Navbar />
			<div style={{paddingBottom: '64px'}}>
				<Route exact path={ROUTES.HOME} component={HomePage} />
				<PrivateRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
				<Route path="/certificate/:id" component={CertificatePage} />
			</div>
			<Footer />
		</Router>
  );
}

export default App;
