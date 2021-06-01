import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
	nested: {
		padding: '0',
    paddingLeft: theme.spacing(9),
  },
}));

const PostsList = () => {
	const classes = useStyles();
	const history = useHistory();
	const certsState = useStoreState(state => state.certs.items);
	const [subListOpen, setSubListOpen] = useState(false);

	const onCertView = id => {
		console.log(id);
		window.open(`/certificate/${id}`, '_blank');
	}

  return (
    <List className={classes.root}>

			{ certsState.length > 0 ?
				certsState.map((cert, i) => (
					<>
						<ListItem button alignItems="flex-start" onClick={e => setSubListOpen(!subListOpen)}>
							<ListItemAvatar>
								<Avatar>{i + 1}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={cert.eventName}
								secondary={
									<>
										<Typography
											component="span"
											variant="body2"
											className={classes.inline}
											color="textPrimary"
										>
											Received on: {cert.date.toDate().toDateString()}
										</Typography>

									</>
								}
							/>
							<ListItemSecondaryAction>
								<IconButton edge="end" aria-label="download" onClick={ e => onCertView(cert.id)}>
									<ViewIcon />
								</IconButton>
								<IconButton edge="end" onClick={e => setSubListOpen(!subListOpen)}>
								{subListOpen ? <ExpandLess /> : <ExpandMore />}
								</IconButton>
							</ListItemSecondaryAction>

						</ListItem>
						<Collapse in={subListOpen} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem className={classes.nested}>
									<ListItemText secondary={"Credential ID: " + cert.id} />
								</ListItem>
								<ListItem className={classes.nested}>
									<ListItemText secondary={`Credential URL: https://${window.location.hostname}/certificate/` + cert.id} />
								</ListItem>
							</List>
						</Collapse>
						<Divider variant="inset" component="li" />
					</>
				))
				: (
					<div style={{textAlign: 'center'}}>
						<Typography>No Certificates associated to this email.</Typography>
					</div>
				)
			}

		</List>
  );
}

export default PostsList;
