import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Checkbox,
} from '@material-ui/core';
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const today = new Date();

const initialValues = {
  amount: 0,
  companyName: '',
  dueDate: ``,
  isPaid: false,
  isRecurring: false,
  type: '',
  website: '',
};

export default function BillForm({ toggleModal }) {
  const classes = useStyles();
  const { currentMonthlyBill, setCurrentMonthlyBill } = useContext(
    MonthlyBillContext
  );
  const [formValues, setFormValues] = useState(initialValues);

  const onChange = e => {
    const { id, value, checked, type } = e.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [id]: valueToUse });
  };

  const onSubmit = e => {
    e.preventDefault();
    const newBill = {
      amount: formValues.amount,
      companyName: formValues.companyName.trim(),
      dueDate: Date.parse(formValues.dueDate),
      isPaid: false,
      isRecurring: formValues.isRecurring,
      type: formValues.type,
      website: formValues.website.trim(),
      monthlyBill: currentMonthlyBill,
    };
    axiosWithAuth()
      .post('/bills/bill', newBill)
      .then(res => {
        setCurrentMonthlyBill({
          ...currentMonthlyBill,
          bills: [...currentMonthlyBill.bills, res.data],
        });
        toggleModal();
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Box>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel htmlFor='outlined-type-native-simple'>
            Bill Type
          </InputLabel>
          <Select
            native
            value={formValues.type}
            onChange={onChange}
            label='Bill Type'
            inputProps={{
              name: 'type',
              id: 'type',
            }}
          >
            <option aria-label='None' value='' />
            <option value='🏠 Rent'>🏠 Rent</option>
            <option value='⚡️ Electric'>⚡️ Electric</option>
            <option value='📺 Television'>📺 Television</option>
            <option value='💻 Internet'>💻 Internet</option>
            <option value='📱 Phone'>📱 Phone</option>
            <option value='🔥 Heating'>🔥 Heating</option>
            <option value='💧 Water'>💧 Water</option>
            <option value='🗑️ Garbage'>🗑️ Garbage</option>
            <option value='🍖 Grocery'>🍖 Grocery</option>
            <option value='❓ Miscellaneous'>❓ Miscellaneous</option>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          id='companyName'
          variant='outlined'
          label='Company Name'
          value={formValues.companyName}
          onChange={onChange}
          helperText='Enter the company name'
        />
      </Box>
      <Box>
        <TextField
          id='amount'
          variant='outlined'
          label='Ammount'
          value={formValues.amount}
          onChange={onChange}
          helperText='Enter the bill amount'
          type='number'
        />
      </Box>
      <Box>
        <TextField
          id='dueDate'
          variant='outlined'
          label='Due Date'
          value={formValues.dueDate}
          onChange={onChange}
          helperText='Enter the due date'
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box>
        <TextField
          id='website'
          variant='outlined'
          label='Website'
          value={formValues.website}
          onChange={onChange}
          helperText='Enter company website'
        />
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              value={formValues.isRecurring}
              onChange={onChange}
              name='isRecurring'
              id='isRecurring'
            />
          }
          label='Recurring Bill'
        />
      </Box>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={onSubmit}
      >
        Submit
      </Button>
    </form>
  );
}
