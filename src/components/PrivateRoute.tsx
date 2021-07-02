import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC<{
  children: React.ReactNode,
  path: string,
}> = ({ children, path }) => {
  const { user } = useAuth();

  return (
    <Route
      path={path}
      render={(props: { location: unknown }) => (user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
