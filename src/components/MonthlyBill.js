import { Box, Typography } from '@material-ui/core';
import Bill from './Bill';

export default function MonthlyBill({ monthlyBill }) {
  return (
    <Box>
      {monthlyBill.bills.map(bill => (
        <Bill bill={bill} key={bill.billid} />
      ))}
    </Box>
  );
}
