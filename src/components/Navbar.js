import React, {useEffect} from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import * as ROUTES from '../constants/routes';
import firebase from '../firebase/firebaseSetup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
	const history = useHistory();
	const classes = useStyles();
	const location = useLocation();
	const startLogout = useStoreActions(actions => actions.auth.startLogout);
	const startSetCerts = useStoreActions(actions => actions.certs.startSetCerts);
	const setLogin = useStoreActions(actions => actions.auth.login);
	const setLogout = useStoreActions(actions => actions.auth.logout);
	const authState = useStoreState(state => state.auth.user);

	useEffect(() => {

			// Listen for firebase auth change event
			firebase.auth().onAuthStateChanged((user) => {
				if(user) {
					// store user in store
					setLogin(user);
					startSetCerts(user);
					// Only redirect to dashboard if the current page is not a certificate page
					if(!location.pathname.includes('certificate')) {
						history.push('/dashboard');
					}
				}
				else {
					setLogout();
					history.push('/');
				}
			})
	}, []);

	const logoutUser = () => {
		startLogout();
	}

  return (
    <div className={classes.root}>
			<AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
					E-Cell VITB Certification Portal
          </Typography>
					{
						authState.uid ?
						<>
						<Button color="inherit" onClick={logoutUser}>Logout</Button>
						<Button color="inherit" component={RouterLink} to={ROUTES.DASHBOARD}>Dashboard</Button>
						</> :
						<Button color="inherit" component={RouterLink} to={ROUTES.HOME}>Login</Button>
					}
        </Toolbar>
      </AppBar>

		</div>
  );
}

export default Navbar;