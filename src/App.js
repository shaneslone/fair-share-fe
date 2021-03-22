import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

import { Grid } from '@material-ui/core';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <Switch>
              <Route path='/signup' component={Signup} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <Route exact path='/' component={Login} />
            </Switch>
          </UserContext.Provider>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default App;
