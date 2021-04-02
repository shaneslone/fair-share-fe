import { useContext, useState } from 'react';
import { HouseholdContext } from '../context/HouseholdContext.js';
import BillForm from './forms/BillForm';

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
  IconButton,
  Button,
  Modal,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { axiosWithAuth } from '../utils/axiosWithAuth';

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
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Bill({ bill, currentMonthlyBill }) {
  const dueDate = new Date(bill.dueDate);
  const classes = useStyles();
  const { household, setHousehold } = useContext(HouseholdContext);
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const [modalBodyEdit, setModalBodyEdit] = useState(false);

  const toggleModal = () => {
    if (open) {
      setModalBodyEdit(false);
    }
    setOpen(!open);
  };

  const onChange = () => {
    axiosWithAuth()
      .patch(`bills/bill/${bill.billid}/updatepaid`, { isPaid: !bill.isPaid })
      .then(res => {
        const updatedBill = res.data;
        setHousehold({
          ...household,
          monthlyBills: household.monthlyBills.map(monthlyBill => {
            if (
              monthlyBill.monthlybillid === currentMonthlyBill.monthlybillid
            ) {
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

  const deleteBill = () => {
    axiosWithAuth()
      .delete(`bills/bill/${bill.billid}`)
      .then(() => {
        setHousehold({
          ...household,
          monthlyBills: household.monthlyBills.map(monthlyBill => {
            if (
              monthlyBill.monthlybillid === currentMonthlyBill.monthlybillid
            ) {
              return {
                ...monthlyBill,
                bills: monthlyBill.bills.filter(
                  currentBill => currentBill.billid !== bill.billid
                ),
              };
            }
            return monthlyBill;
          }),
        });
        toggleModal();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const deleteBody = (
    <div style={modalStyle} className={classes.paper}>
      <Box>
        <Typography>Are you sure you want to delete this bill?</Typography>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={deleteBill}
        >
          Confirm Delete
        </Button>
      </Box>
    </div>
  );

  const editBody = (
    <div style={modalStyle} className={classes.paper}>
      <BillForm billToEdit={bill} />
    </div>
  );

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
          <IconButton
            edge='start'
            color='inherit'
            aria-label='delete'
            onClick={toggleModal}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='edit'
            onClick={() => {
              setModalBodyEdit(true);
              toggleModal();
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </AccordionDetails>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby='delete bill'
        aria-describedby='delete a new bill'
      >
        {modalBodyEdit ? editBody : deleteBody}
      </Modal>
    </Accordion>
  );
}
