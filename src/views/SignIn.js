import React from 'react';
import { useHistory } from 'react-router-dom';
import db, { auth, provider } from '../firebase';

const SignIn = (props) => {
  const history = useHistory();

  function registerUser (uid) {
    // Add a new document in collection "cities"
    db.collection("users").doc(uid).set({
      followers: [],
      following: [],
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(data => {
        if (data.additionalUserInfo.isNewUser) {
          registerUser(data.user.uid);
        };
      })
      .catch(err => alert(err))
  };

  return (
    <div className="h-full grid place-items-center">
      <button onClick={signIn} className="py-3 px-6 shadow-md rounded-md font-semibold bg-gray-300 text-gray-800 hover:bg-gray-100">
        Sign In with Google
      </button>
    </div>
  );
}

export default SignIn;
