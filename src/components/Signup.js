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

const initalValues = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
};

export default function Signup() {
  const classes = useState();

  const [user, setUser] = useState(initalValues);

  const onChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:2019/createnewuser', user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          id='username'
          variant='outlined'
          label='Username'
          value={user.username}
          onChange={onChange}
          helperText='Please enter your username'
        />
      </div>
      <div>
        <TextField
          id='password'
          variant='outlined'
          label='Password'
          value={user.password}
          onChange={onChange}
          type='password'
          helperText='Please enter your password'
        />
      </div>
      <div>
        <TextField
          id='email'
          variant='outlined'
          label='Email'
          value={user.email}
          onChange={onChange}
          helperText='Please enter your username'
        />
      </div>
      <div>
        <TextField
          id='firstName'
          variant='outlined'
          label='First Name'
          value={user.firstName}
          onChange={onChange}
          helperText='Please enter your First Name'
        />
      </div>
      <div>
        <TextField
          id='lastName'
          variant='outlined'
          label='Last Name'
          value={user.lastName}
          onChange={onChange}
          helperText='Please enter your Last Name'
        />
      </div>
      <Button variant='contained' color='primary' onClick={onSubmit}>
        Submit
      </Button>
    </form>
  );
}
