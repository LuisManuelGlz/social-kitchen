import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import firebase from 'firebase';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/config';

interface Props extends RouteProps {
  component: ComponentType<any>;
}

const PublicRoute = ({ component: Component, ...rest }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  const onAuthStateChanged = (user: firebase.User | null) => {
    setUser(user);
    if (isLoading) setIsLoading(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;
