import firebase from 'firebase';

export const readDoc = async (id, setName, setContent, setTime) => {
  await firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .get()
    .then(doc => {
      const note = doc.data();
      setName(note.name);
      setContent(note.content);
      setTime(note.timestamp.seconds);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
};
