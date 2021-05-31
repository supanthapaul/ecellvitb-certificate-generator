import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStoreActions, useStoreState } from 'easy-peasy';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const PostsList = () => {
	const classes = useStyles();
	const certsState = useStoreState(state => state.certs.items);

	const onCertView = id => {
		console.log(id);
	}

  return (
    <List className={classes.root}>
			{
				certsState.map((cert, i) => (
					<>
						<ListItem alignItems="flex-start">
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
							</ListItemSecondaryAction>
						</ListItem>
						<Divider variant="inset" component="li" />
					</>
				))
			}

		</List>
  );
}

export default PostsList;
