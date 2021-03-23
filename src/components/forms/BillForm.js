import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { MonthlyBillContext } from '../../context/MonthlyBillContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const initialValues = {
  ammount: 0,
  companyName: '',
  dueDate: '',
  isPaid: false,
  isRecurring: false,
  type: '',
  website: '',
};

export default function BillForm() {
  const classes = useState();
  const { currentMonthlyBill } = useContext(MonthlyBillContext);
  return <Container className={classes.root}></Container>;
}
