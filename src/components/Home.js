import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import hero from '../images/hero.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '93vh',
    width: '100vw',
  },
  header: {
    background: 'white',
    opacity: '80%',
    margin: theme.spacing(5),
    borderRadius: '10px',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid container direction='column'>
      <Grid item className={classes.root} align='center'>
        <Grid item xs={12} sm={8}>
          <Typography variant='h1' align='center' className={classes.header}>
            Welcome to Fair Share!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
