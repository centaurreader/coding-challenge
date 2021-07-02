import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../hooks/useAuth';

const Authen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const { signIn } = useAuth();
  const history = useHistory<{ from: { pathname: string } }>();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn(username, password);
      const {
        location: {
          state: {
            from: {
              pathname = '/',
            } = {},
          } = {},
        } = {},
      } = history;
      history.push(pathname || '/');
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <h1 className="title1">Login</h1>

        {serverError ? <p className="text-error text-center">{serverError}</p> : null}

        <div className="u-mt-md">
          <TextInput
            id="username"
            label="Username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            required
          />
        </div>

        <div className="u-mt-md">
          <TextInput
            id="password"
            label="Password"
            onChange={(event) => setPassword(event.target.value)}
            secure
            value={password}
            required
          />
        </div>

        <div className="u-mt-lg">
          <Button type="submit">
            Log In
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Authen;
