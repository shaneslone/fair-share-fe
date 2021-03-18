import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import NavMenu from './NavMenu';

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setNavOpen(open);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography className={classes.typographyStyles}>Fair Share</Typography>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={'right'} open={navOpen} onClose={toggleDrawer(false)}>
          <NavMenu toggleDrawer={toggleDrawer} />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
