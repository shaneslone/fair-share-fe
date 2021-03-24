import { useContext } from 'react';
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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/styles';
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
}));

export default function NavMenu({ toggleDrawer }) {
  const classes = useStyles();
  const { userInfo } = useContext(UserContext);
  const notLoggedIn = () => {
    return (
      <List>
        <Link href='/signup' color='inherit'>
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
        </Link>
        <Link href='/login' color='inherit'>
          <ListItem button>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={'Log In'} />
          </ListItem>
        </Link>
      </List>
    );
  };

  const loggedIn = () => {
    return (
      <List>
        <Link href='/login' color='inherit'>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </Link>
      </List>
    );
  };

  return (
    <Box
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {userInfo ? loggedIn() : notLoggedIn()}
    </Box>
  );
}
