import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const initalValues = {
    username: '',
    password: '',
  };
  const [credentials, setCredentials] = useState(initalValues);

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:2019/login',
        `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        setCredentials(initalValues);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          id='username'
          variant='outlined'
          label='Username'
          value={credentials.username}
          onChange={onChange}
          helperText='Please enter your username'
        />
      </div>
      <div>
        <TextField
          id='password'
          variant='outlined'
          label='Password'
          value={credentials.password}
          onChange={onChange}
          type='password'
          helperText='Please enter your password'
        />
      </div>
      <Button variant='contained' color='primary' onClick={onSubmit}>
        Submit
      </Button>
    </form>
  );
}
