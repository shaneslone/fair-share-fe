import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UserCard from './UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
}));

export default function HouseholdUsers({ users }) {
  const classes = useStyles();
  return (
    <Grid item container>
      {users.map(user => (
        <Grid item xs={12} sm={5} className={classes.root} key={user.userId}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
