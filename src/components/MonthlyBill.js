import { useState } from 'react';
import { Box, Typography, Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Bill from './Bill';
import BillForm from './forms/BillForm';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MonthlyBill({ monthlyBill }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <BillForm toggleModal={toggleModal} />
    </div>
  );
  return (
    <Box className={classes.root}>
      {monthlyBill.bills.map(bill => (
        <Bill bill={bill} key={bill.billid} />
      ))}
      <Button variant='contained' color='primary' onClick={toggleModal}>
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
