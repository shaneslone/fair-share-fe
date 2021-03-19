import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function NavMenu({ toggleDrawer }) {
  const classes = useStyles();
  return (
    <div
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link to='/signup' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary={'Log In'} />
        </ListItem>
      </List>
    </div>
  );
}
