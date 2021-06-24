import { action, thunk } from 'easy-peasy';
import firebase, { database as db } from '../firebase/firebaseSetup';
import dayjs from 'dayjs';

const certsModel = {
	items: [],
	error: null,
	// add a single note to firebase
	// payload --> note
	startAddCert: thunk((actions, payload) => {
		const newCert = {
			...payload,
			date: dayjs().format()
		}
		const newDoc = db.collection("certificates").doc();
		return newDoc.set({
			id: newDoc.id,
			...newCert
		});
	}),
	// update a note from firebase by id
	// payload --> updated note
	startUpdateCert: thunk((actions, payload) => {
		return db.collection("certificates").doc(payload.id).set({
			...payload,
			date: dayjs().format()
		}, { merge: true })

	}),
	// get all the certificates of the user from firebase
	// payload --> uid
	startSetCerts: thunk((actions, payload) => {
		return db.collection("certificates").where("email", "==", payload.email).get()
		.then(snapshot => {
				const certificates = [];
				snapshot.forEach(doc => {
					certificates.push({
						id: doc.id,
						...doc.data()
					});
				});
				// set notes to local state
				actions.setCerts(certificates);
			}, error => {
				// set error to local state
				actions.setError(error);
			}
		)

	}),
	// delete a note from firebase
	// payload --> id
	startDeleteCert: thunk((actions, payload) => {
		return db.collection("certificates").doc(payload).delete()
	}),
	addCert: action((state, payload) => {
		state.items = [...state.items, payload];
	}),
	deleteCert: action((state, payload) => {
		state.items = state.items.filter(note => note.id != payload)
	}),
	setCerts: action((state, payload) => {
		state.items = [...payload]
	}),
	setError: action((state, payload) => {
		state.error = payload;
	})
}

export default certsModel;