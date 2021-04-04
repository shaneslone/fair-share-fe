import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Signup from './Signup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Modal,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

function getModalStyle() {
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UserCard({ user }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle());
  const { userInfo } = useContext(UserContext);

  const toggleModal = () => {
    setOpen(!open);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Signup toggleModal={toggleModal} />
    </div>
  );

  if (!userInfo) return 'Loading...';
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography>{user.username.toUpperCase()}</Typography>
        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
        <Typography>{user.email}</Typography>
      </CardContent>
      <CardActions>
        {userInfo.userId === user.userId && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='edit'
            onClick={toggleModal}
          >
            <EditIcon />
          </IconButton>
        )}
      </CardActions>
      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby='edit user'
        aria-describedby='edier user'
      >
        {body}
      </Modal>
    </Card>
  );
}
