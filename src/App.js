import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Household from './components/Household';
import Home from './components/Home';

import { Grid } from '@material-ui/core';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <Grid container direction='column'>
        <Grid item>
          <Header />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <Switch>
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/household' component={Household} />
              <Route exact path='/' component={Home} />
            </Switch>
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </UserContext.Provider>
  );
}

export default App;
