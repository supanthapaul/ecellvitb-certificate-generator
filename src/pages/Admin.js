import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {database as db, Timestamp} from '../firebase/firebaseSetup';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '700px',
		margin: '0 auto',
		marginTop: theme.spacing(3),
	},
	inline: {
		display: 'inline',
	},
}));

const Admin = () => {
	const classes = useStyles();

	useEffect(() => {
		document.title = "Admin | E-Cell VITB Certification Portal"
	}, [])
	const [names, setNames] = useState("");
	const [emails, setEmails] = useState("");
	const [eventName, setEventName] = useState("");
	const [eventId, setEventId] = useState("");
	const [date, setDate] = useState(new Date());


	const handleSubmit = (evt) => {
		evt.preventDefault();
		const emailsList = emails.trim().split("\n");
		const namesList = names.trim().split("\n");
		const batch = db.batch();
		for (let i = 0; i < namesList.length; i++) {
			if(namesList[i].trim() == "" && namesList[i].trim() == ""){
				console.log("Found empty")
				continue;
			}
			const newCertificate = {
				name: namesList[i].trim(),
				email: emailsList[i].trim(),
				eventId,
				eventName,
				date: Timestamp.fromDate(date)
			}
			console.log(newCertificate);
			var docRef = db.collection("certificates").doc();
			batch.set(docRef, newCertificate);
		}
		batch.commit()
			.then(() => console.log("Done"))
			.catch(err => console.log(err))
	}
	const changeNames = (e) => {
		setNames(e.target.value)
	}
	const changeEmails = (e) => {
		setEmails(e.target.value)
	}

	const getDateString = (myDate) => {
		console.log(myDate)
		const offset = myDate.getTimezoneOffset()
		myDate = new Date(myDate.getTime() - (offset*60*1000))
		return myDate.toISOString().split('T')[0]
	}
	return (
		<form onSubmit={handleSubmit}>
			<br />
			<br />
			<label>
				Name:
				<textarea
					type="text"
					value={names}
					onChange={changeNames}
				/>
			</label>
			<br />
			<label>
				Email:
				<textarea
					value={emails}
					onChange={changeEmails}
				/>
			</label>
			<br />
			<label>
				Event Name:
				<input
					type="text"
					value={eventName}
					onChange={e => setEventName(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Event Id:
				<input
					type="text"
					value={eventId}
					onChange={e => setEventId(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Date:
				<input
					type="date"
					value={getDateString(date)}
					onChange={e => setDate(new Date(e.target.value))}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
}

export default Admin;
