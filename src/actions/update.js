import firebase from 'firebase';

export const updateDoc = async (id, name, content) => {
  await firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      name,
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

//   firebase
//     .firestore()
//     .collection('notes')
//     .doc(id)
//     .set({
//       name: name,
//       content: content,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })
//     .then(function() {
//       console.log('Document successfully written!');
//     })
//     .catch(function(error) {
//       console.error('Error writing document: ', error);
//     });
