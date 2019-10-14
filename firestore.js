  
import {db} from '././firebase';
const saveFavorite = async (artist) => {
  await db
    .collection ('favorites')
    .add (artist)
    .then (function () {
      console.log ('Document successfully written!');
    })
    .catch (function (error) {
      console.error ('Error writing document: ', error);
    });
};

const getFavorites = async () => {
  return await db
    .collection ('favorites')
    .get ()
    .then (function (querySnapshot) {
      const documents = querySnapshot.docs.map(doc => doc.data())
      return documents;
    });
};
export {saveFavorite, getFavorites};