import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Home = () => {
	const classes = useStyles();
	const startLogin = useStoreActions(actions => actions.auth.startLogin);
	const setLoginError = useStoreActions(actions => actions.auth.setError);
	const errorState = useStoreState(state => state.auth.error);

	const loginWithGoogle = () => {
		startLogin()
			.then(res => {
				if(res.additionalUserInfo.isNewUser) {
					const message = "Please enter/update the name that you wish to be used in the certificates.\n Please make sure the name is correct, THIS CANNOT BE CHANGED LATER.";
					window.focus();
					const newName = prompt(message, res.user.displayName);
					firebase.auth().currentUser.updateProfile({
						displayName: newName
					})
					.then(() => {
						console.log("Profile name updated to " + newName);
					})
					.catch((err) => {
						console.log(err);
					})
				}
			})
			.catch(error => {
				// login failed, set error state
				setLoginError(error);
			})
	}

	const updateName = (name) => {

	}

	useEffect(() => {
		document.title ="Login | E-Cell VITB Certification Portal"
	}, [])

  return (
    <div className={classes.root}>
      <Typography variant="h3">E-Cell VITB Certification Portal</Typography>
			<br/>
      <Typography variant="subtitle1">Please Login with the same email that you provided for registering to our events in order to see your present or past certificates.</Typography>
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
