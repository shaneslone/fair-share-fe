import { useContext, useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { UserContext } from '../context/UserContext';
import { Box, Typography } from '@material-ui/core';
import MonthlyBill from './MonthlyBill';

export default function Dashboard() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [household, setHousehold] = useState(null);
  useEffect(() => {
    axiosWithAuth()
      .get('users/getuserinfo')
      .then(res => {
        setUserInfo(res.data);
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
  }, []);
  return (
    <Box>
      {household &&
        household.monthlyBills.map(monthlyBill => (
          <MonthlyBill
            monthlyBill={monthlyBill}
            key={monthlyBill.monthlybillid}
          />
        ))}
    </Box>
  );
}
