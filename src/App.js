import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Loader from "react-loader-spinner";
import SignIn from './views/SignIn';
import Feed from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Header from './components/Header';
import './App.css';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch } from 'react-redux';
import { removeUserInfo, setUserInfo } from './features/appSlice';


function App() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [uploads, loading, error] = useCollection(db.collection('uploads'));

  auth.onAuthStateChanged((user) => {
    if (!user) {
      dispatch(removeUserInfo());
    }
  });

  useEffect(() => {
    const unsub = db.collection('users').doc(user?.uid).onSnapshot(docSnapshot => {
      dispatch(setUserInfo(docSnapshot.data()));
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    return unsub;
  }, [user])

  return (
    <div className="app flex flex-col">

      <Router>
          {user && <Header />}
          
          
          <PrivateRoute exact path="/">
            <Feed uploads={uploads} />
          </PrivateRoute>
          
          <div className="container mx-auto flex-1 overflow">
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>

            <PrivateRoute exact path="/upload">
              <Upload />
            </PrivateRoute>
          </div>
      </Router>

    </div>
  )
}

export default App;

function PrivateRoute({ children, ...rest }) {
  const [user, loading, error] = useAuthState(auth);



  return (
    <Route
      {...rest}
      render={({ location }) =>
        (loading) ? (
          <div className="loader__container">
            <Loader
              type="TailSpin"
              color="lightgrey"
              height={100}
              width={100}
            />
          </div>
        ) :
        (user) ? (
          children
        ) : (
          <SignIn location={location} />
        )
      }
    />
  );
}