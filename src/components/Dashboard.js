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
  Modal,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import MonthlyBill from './MonthlyBill';
import HouseholdUsers from './HouseholdUsers';

function getModalStyle() {
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

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
  paper: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  householdKey: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  accordion: {
    margin: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { push } = useHistory();

  const [household, setHousehold] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentMonthlyBill, setCurrentMonthlyBill] = useState(null);
  const [currentMonthlyBillTotal, setCurrentMothlyBillTotal] = useState(0);
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

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
    const lastMonth = household.monthlyBills.sort((a, b) => b.date - a.date)[0];
    const newMonthlyBill = {
      household: userInfo.household,
      date: Date.now(),
      bills: lastMonth.bills.map(bill => {
        return {
          type: bill.type,
          companyName: bill.companyName,
          amount: bill.isRecurring ? bill.amount : 0,
          isRecurring: bill.isRecurring,
          dueDate: Date.now(),
          isPaid: false,
          website: bill.website,
        };
      }),
    };

    axiosWithAuth()
      .post('/monthlybills/monthlybill', newMonthlyBill)
      .then(res => {
        setHousehold({
          ...household,
          monthlyBills: [res.data, ...household.monthlyBills],
        });
        toggleModal();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const deleteMonth = () => {
    axiosWithAuth().delete(
      `/monthlybills/monthlybill/${currentMonthlyBill.monthlybillid}`
    );
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography>
        New month of bills added! Edit bills to update new ammounts and due
        dates!
      </Typography>
    </div>
  );

  return (
    <HouseholdContext.Provider value={{ household, setHousehold }}>
      {household && (
        <Typography variant='h6' align='center' gutterBottom>
          Household Key: {household.householdKey}
        </Typography>
      )}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='household-members'
          id='household-members'
        >
          <Typography className={classes.heading}>
            Household Memebers
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {household && <HouseholdUsers users={household.users} />}
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
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby='monthly bills added'
        aria-describedby='added a new month of bills'
      >
        {body}
      </Modal>
      <Button variant='contained' color='primary' onClick={deleteMonth}>
        Delete Month
      </Button>
    </HouseholdContext.Provider>
  );
}
