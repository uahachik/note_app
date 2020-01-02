import firebase from 'firebase';

export const deleteDoc = async id => {
  await firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .delete()
    .then(function() {
      console.log('Document deleted!');
    })
    .catch(function(error) {
      console.error('Error writing document: ', error);
    });
};
