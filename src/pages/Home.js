import React, { useEffect } from 'react';
import {  useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import firebase from '../firebase/firebaseSetup';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const useStyles = makeStyles((theme) => ({
  root: {
		marginTop: theme.spacing(5),
    display: 'flex',
		flexDirection:"column",
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
  },
	button: {

	},
	authUI: {
		minWidth: 500
	 }
}));

const uiConfig = {
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Home = () => {
	const classes = useStyles();
	const errorState = useStoreState(state => state.auth.error);

	useEffect(() => {
		document.title ="Login | E-Cell VITB Certification Portal"
	}, [])

  return (
    <div className={classes.root}>
      <Typography variant="h3">E-Cell VITB Certification Portal</Typography>
			<br/>
			<Alert severity="info">Please Signup/Login with the same email that you provided for registering to our events in order to see your present or past certificates.</Alert>
			<br/>
			<br/>
			<StyledFirebaseAuth className={classes.authUI} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			{/* <Button color="primary" variant="contained" size="large" className={classes.button} onClick={loginWithGoogle}>Login with Google</Button> */}
			{
				errorState && <p>
					{errorState.message}
				</p>
			}
    </div>
  );
}

export default Home;
