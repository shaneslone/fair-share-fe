import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Link,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
}));

export default function NavMenu({ toggleDrawer }) {
  const classes = useStyles();
  return (
    <Box
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href='/signup' color='inherit'>
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
        </Link>
        <Link href='/' color='inherit'>
          <ListItem button>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={'Log In'} />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
