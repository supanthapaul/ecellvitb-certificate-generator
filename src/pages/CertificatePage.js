import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory, useParams } from 'react-router-dom'
import {database as db, storage} from '../firebase/firebaseSetup';
import { PDFDocument } from 'pdf-lib'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '850px',
		margin: '0 auto',
		marginTop: theme.spacing(3)
  },
  inline: {
    display: 'inline',
  },
	titleText: {
		fontSize: '26px',
		marginBottom: '1rem'
	}
}));

const Dashboard = () => {
	const classes = useStyles();
	const { id } = useParams();
	const [pdfUrl, setPdfUrl] = useState("");
	const [certData, setCertData] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		db.collection("certificates").doc(id).get().then(async (doc) => {
			if (doc.exists) {
				const certData = doc.data();
				// set student name
				setCertData(certData);
				// get certificate file
				storage.ref(certData.eventId + '.pdf').getDownloadURL().then(async url => {
					// fetch the pdf file
					const certFile = await fetch(url).then(res => {
						return res.arrayBuffer();
					})
					const pdfDoc = await PDFDocument.load(certFile)
					pdfDoc.setTitle("Certificate of achievement")
					// draw name
					pdfDoc.getPages()[0].drawText(certData.name, {
						x: 300,
						y: 270,
						size: 56
					})

					const pdfUrl = await pdfDoc.saveAsBase64({dataUri: true});

					setPdfUrl(pdfUrl);
					setLoading(false);
				})
			}
		})
	}, [])

  return (
    <div className={classes.root}>
			{loading ? <LinearProgress /> : (
				<>
				{
					certData && (
						<Typography variant="subtitle1" className={classes.titleText}>This certificate is hereby granted to <b>{certData.name}</b> on {certData.date.toDate().toDateString()} by <a href="http://ecellvitb.tk/" target="_blank">E-Cell, VIT Bhopal</a></Typography>
					)
				}
				<iframe src={pdfUrl} width="100%" height="500px"></iframe>
			</>)}

    </div>
  );
}

export default Dashboard;
