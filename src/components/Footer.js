import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '700px',
		margin: '0 auto',
		marginTop: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
	footer: {
		position:'absolute',
   	bottom:0,
		height: '64px',
		background: '#444'
	},
	toolbar: {
		flexDirection: 'column',
		justifyContent: 'center'
	}
}));

export default function Footer() {
	const classes = useStyles();
	return (
			<AppBar position="static" color="primary" className={classes.footer}>
				<Container maxWidth="md">
					<Toolbar className={classes.toolbar}>
						<Typography variant="body1" color="inherit">
							© 2021 E-Cell, VIT Bhopal
						</Typography>
						<Typography variant="body1" style={{fontSize: '12px'}} color="inherit">
						Made by <a style={{color:'#fff'}} href="https://www.linkedin.com/in/supantha-paul-5977041b8/">Supantha Paul</a>
						</Typography>
					</Toolbar>
				</Container>
			</AppBar>
	)
}