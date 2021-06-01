import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CertsList from '../components/CertsList';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '700px',
		margin: '0 auto',
		marginTop: theme.spacing(3)
  },
  inline: {
    display: 'inline',
  },
}));

const Dashboard = () => {
	const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5">Your Certificates</Typography>
			{/* <UploadSound /> */}
			<CertsList />
    </div>
  );
}

export default Dashboard;
