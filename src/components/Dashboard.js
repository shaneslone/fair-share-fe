import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { HouseholdContext } from '../context/HouseholdContext.js';
import {
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MonthlyBill from './MonthlyBill';
import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [household, setHousehold] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentMonthlyBill, setCurrentMonthlyBill] = useState(null);

  useEffect(() => {
    axiosWithAuth()
      .get('users/getuserinfo')
      .then(res => {
        setUserInfo(res.data);
        return axiosWithAuth().get(
          `households/household/${res.data.household.householdid}`
        );
      })
      .then(res => {
        setHousehold(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [setUserInfo]);

  const handleChange = e => {
    setCurrentMonth(e.target.value);
    setCurrentMonthlyBill(
      household.monthlyBills.filter(
        monthlyBill => monthlyBill.monthlybillid === parseInt(e.target.value)
      )[0]
    );
  };

  useEffect(() => {
    if (currentMonthlyBill) {
      setCurrentMonthlyBill(
        household.monthlyBills.filter(
          monthlyBill =>
            monthlyBill.monthlybillid === currentMonthlyBill.monthlybillid
        )[0]
      );
    }
  }, [household, currentMonthlyBill]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <HouseholdContext.Provider value={{ household, setHousehold }}>
      <Box className={classes.root}>
        <UserCard userInfo={userInfo} />
        <Typography>Select Bills</Typography>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel htmlFor='outlined-currentMonth-native-simple'>
            Month
          </InputLabel>
          <Select
            native
            value={currentMonth}
            onChange={handleChange}
            label='Select Month'
            inputProps={{
              name: 'currentMonth',
              id: 'outlined-currentMonth-native-simple',
            }}
          >
            <option aria-label='None' value='' />
            {household &&
              household.monthlyBills.map(monthlyBill => {
                const date = new Date(monthlyBill.date);
                return (
                  <option
                    key={monthlyBill.monthlybillid}
                    value={monthlyBill.monthlybillid}
                  >
                    {`${months[date.getMonth()]} ${date.getFullYear()}`}
                  </option>
                );
              })}
          </Select>
        </FormControl>
        {currentMonthlyBill && <MonthlyBill monthlyBill={currentMonthlyBill} />}
      </Box>
    </HouseholdContext.Provider>
  );
}
