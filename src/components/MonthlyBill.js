import { Box, Typography } from '@material-ui/core';
import Bill from './Bill';

export default function MonthlyBill({ monthlyBill }) {
  return (
    <Box>
      <Typography>{new Date(monthlyBill.date).toDateString()}</Typography>
      {monthlyBill.bills.map(bill => (
        <Bill bill={bill} key={bill.billid} />
      ))}
    </Box>
  );
}
