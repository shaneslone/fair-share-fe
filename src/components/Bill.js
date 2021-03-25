import { useContext } from 'react';
import { HouseholdContext } from '../context/HouseholdContext.js';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  makeStyles,
  Box,
  Link,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Bill({ bill, currentMonthlyBill }) {
  const dueDate = new Date(bill.dueDate);
  const classes = useStyles();
  const { household, setHousehold } = useContext(HouseholdContext);
  const onChange = () => {
    axiosWithAuth()
      .patch(`bills/bill/${bill.billid}/updatepaid`, { isPaid: !bill.isPaid })
      .then(res => {
        const updatedBill = res.data;
        console.log(updatedBill);
        setHousehold({
          ...household,
          monthlyBills: household.monthlyBills.map(monthlyBill => {
            if (monthlyBill.monthlybillid == currentMonthlyBill.monthlybillid) {
              return {
                ...monthlyBill,
                bills: monthlyBill.bills.map(bill => {
                  if (bill.billid === updatedBill.billid) {
                    return updatedBill;
                  }
                  return bill;
                }),
              };
            }
            return monthlyBill;
          }),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label='Expand'
        aria-controls='additional-actions1-content'
        id='additional-actions1-header'
      >
        <FormControlLabel
          aria-label='Paid'
          onClick={event => event.stopPropagation()}
          onFocus={event => event.stopPropagation()}
          control={
            <Checkbox checked={bill.isPaid} onChange={onChange} id='isPaid' />
          }
          label={bill.companyName}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography color='textSecondary'>{bill.type}</Typography>
          <Link href={bill.website} color='textSecondary'>
            {bill.website}
          </Link>
          <Typography color='textSecondary'>Amount: ${bill.amount}</Typography>
          <Typography color='textSecondary'>
            Due: {dueDate.toDateString()}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
