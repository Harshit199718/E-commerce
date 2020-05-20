import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDXAHCwP4QZan3eHVuou-LGK6MhwlPKIA0",
    authDomain: "crwn-db-e045f.firebaseapp.com",
    databaseURL: "https://crwn-db-e045f.firebaseio.com",
    projectId: "crwn-db-e045f",
    storageBucket: "crwn-db-e045f.appspot.com",
    messagingSenderId: "144419930808",
    appId: "1:144419930808:web:ccb7c1e9bd1b1629f36a4d",
    measurementId: "G-E89TE8FFRS"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) =>{
      var data = additionalData
      if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = Date.now();

        try{
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message)
        }
    }

    return userRef
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})

  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase