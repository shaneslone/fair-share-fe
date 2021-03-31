import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

import { Box, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Household() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [householdKey, setHouseholdKey] = useState('');
  const { push } = useHistory();
  const classes = useStyles();

  useEffect(() => {
    axiosWithAuth()
      .get('/users/getuserinfo')
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setUserInfo]);

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/households/household/${householdKey}/adduser`)
      .then(res => {
        console.log(res.data);
        push('/dashboard');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const createNewHousehold = e => {
    axiosWithAuth()
      .post('/households/household')
      .then(res => {
        console.log(res.data);
        push('/dashboard');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <Box className={classes.root}>
      <Typography>Join an exsisting household, or create your own!</Typography>
      <form noValidate autoComplete='off'>
        <Box>
          <TextField
            id='householdKey'
            variant='outlined'
            label='Household Key'
            value={householdKey}
            onChange={e => {
              setHouseholdKey(e.target.value);
            }}
          />
        </Box>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={onSubmit}
        >
          Submit
        </Button>
      </form>
      <Button variant='contained' color='primary' onClick={createNewHousehold}>
        Create New Household
      </Button>
    </Box>
  );
}
