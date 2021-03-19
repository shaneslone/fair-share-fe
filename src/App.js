import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

import { Grid } from '@material-ui/core';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={2} sm={5} />
        <Grid item xs={8} sm={2}>
          <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <Switch>
              <Route path='/signup' component={Signup} />
              <Route path='/' component={Login} />
            </Switch>
          </UserContext.Provider>
        </Grid>
        <Grid item xs={2} sm={5} />
      </Grid>
    </Grid>
  );
}

export default App;
