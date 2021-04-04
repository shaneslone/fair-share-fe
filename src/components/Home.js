import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import hero from '../images/hero.jpg';

const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '93vh',
    width: '99vw',
  },
  header: {
    textAlign: 'center',
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.root}>
      <Typography variant='h1' className={classes.header}>
        Welcome to Fair Share!
      </Typography>
    </Grid>
  );
}
