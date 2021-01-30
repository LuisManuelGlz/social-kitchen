import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  component: ComponentType<any>;
}

const PublicRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        false ? (
          <div>Loading...</div>
        ) : false ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
