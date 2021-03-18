import { Grid } from '@material-ui/core';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={2} sm={5} />
        <Grid item xs={8} sm={2}>
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route path='/' component={Login} />
          </Switch>
        </Grid>
        <Grid item xs={2} sm={5} />
      </Grid>
    </Grid>
  );
}

export default App;
