import { useState } from 'react';
import { Box, Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Bill from './Bill';
import BillForm from './forms/BillForm';

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
  paper: {
    position: 'absolute',
    width: '80%',
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
  button: {
    margin: theme.spacing(2),
  },
}));

export default function MonthlyBill({ monthlyBill }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <BillForm toggleModal={toggleModal} currentMonthlyBill={monthlyBill} />
    </div>
  );

  return (
    <Box className={classes.root}>
      {monthlyBill.bills.map(bill => (
        <Bill bill={bill} key={bill.billid} currentMonthlyBill={monthlyBill} />
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={toggleModal}
        className={classes.button}
      >
        Add Bill
      </Button>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby='add bill'
        aria-describedby='add a new bill'
      >
        {body}
      </Modal>
    </Box>
  );
}
