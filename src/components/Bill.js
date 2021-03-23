import { useState } from 'react';
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

export default function Bill(props) {
  const [bill, setBill] = useState(props.bill);
  const dueDate = new Date(bill.dueDate);
  console.log(!bill.isPaid);
  const classes = useStyles();
  const onChange = () => {
    axiosWithAuth()
      .patch(`bills/bill/${bill.billid}/updatepaid`, { isPaid: !bill.isPaid })
      .then(() => {
        console.log('updated');
        setBill({ ...bill, isPaid: !bill.isPaid });
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
