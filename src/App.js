import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Loader from "react-loader-spinner";
import SignIn from './views/SignIn';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Header from './components/Header';
import './App.css';


function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="app flex flex-col">

      <Router>
          {user && <Header />}
          
          <div className="container mx-auto flex-1 overflow-hidden">
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>

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