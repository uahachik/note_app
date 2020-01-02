import firebase from 'firebase';

export const createDoc = async (name, content) => {
  await firebase
    .firestore()
    .collection('notes')
    .add({
      name: name.toUpperCase(),
      content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      console.log('Document successfully written!');
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
};
