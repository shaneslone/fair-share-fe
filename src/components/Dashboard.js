import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { HouseholdContext } from '../context/HouseholdContext.js';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    minWidth: '25%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [household, setHousehold] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentMonthlyBill, setCurrentMonthlyBill] = useState(null);
  const [currentMonthlyBillTotal, setCurrentMothlyBillTotal] = useState(0);
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get('users/getuserinfo')
      .then(res => {
        setUserInfo(res.data);
        if (!res.data.household) {
          push('/household');
        }
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
  }, [setUserInfo, push]);

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
      setCurrentMothlyBillTotal(
        currentMonthlyBill.bills.reduce((total, bill) => total + bill.amount, 0)
      );
    }
  }, [household, currentMonthlyBill]);

  const addMonth = () => {
    const newMonthlyBill = {
      household: userInfo.household,
      date: Date.now(),
    };

    axiosWithAuth()
      .post('/monthlybills/monthlybill', newMonthlyBill)
      .then(res => {
        setHousehold({
          ...household,
          monthlyBills: [...household.monthlyBills, res.data],
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>
            Household Memebers
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {household &&
            household.users.map(user => (
              <UserCard user={user} key={user.userId} />
            ))}
        </AccordionDetails>
      </Accordion>
      <Box className={classes.root}>
        <Button variant='contained' color='primary' onClick={addMonth}>
          Add New Month
        </Button>
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
        {currentMonthlyBill && (
          <Box>
            <Typography>Total Bills: ${currentMonthlyBillTotal}</Typography>
            <Typography>
              Your Share: ${currentMonthlyBillTotal / household.users.length}
            </Typography>
          </Box>
        )}
        {currentMonthlyBill && <MonthlyBill monthlyBill={currentMonthlyBill} />}
      </Box>
    </HouseholdContext.Provider>
  );
}
