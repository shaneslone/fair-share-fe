import { useContext, useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { UserContext } from '../context/UserContext';
import {
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MonthlyBill from './MonthlyBill';

const useStyles = makeStyles(theme => ({
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
  const { setUserInfo } = useContext(UserContext);
  const [household, setHousehold] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [monthlyBill, setMonthlyBill] = useState(null);

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
  }, []);

  const handleChange = e => {
    setCurrentMonth(e.target.value);
    setMonthlyBill(
      household.monthlyBills.filter(
        monthlyBill => monthlyBill.monthlybillid == e.target.value
      )[0]
    );
  };

  return (
    <Box>
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
            household.monthlyBills.map(monthlyBill => (
              <option
                key={monthlyBill.monthlybillid}
                value={monthlyBill.monthlybillid}
              >
                {new Date(monthlyBill.date).toLocaleDateString()}
              </option>
            ))}
        </Select>
      </FormControl>
      {monthlyBill && <MonthlyBill monthlyBill={monthlyBill} />}
    </Box>
  );
}
