import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { ProvideAuth } from './hooks/useAuth';
import Audit from './routes/Audit';
import Authen from './routes/Authen';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <ProvideAuth>
    <Router>
      <Switch>
        <Route path="/login">
          <Authen />
        </Route>
        <PrivateRoute path="/">
          <Audit />
        </PrivateRoute>
      </Switch>
    </Router>
  </ProvideAuth>
);

export default App;
