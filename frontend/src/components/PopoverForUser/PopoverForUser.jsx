import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter,
  useHistory
} from "react-router-dom";
import { setUserName, isLogined, existHistory,addHistory } from '../../redux/slices/mainSlices';
import style from './PopoverForUser.module.css';


import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

export default function PopoverForUser() {
  const dispatch = useDispatch();
  const userNameState = useSelector(state => state.main.userName);
  const userId = useSelector(state => state.main.userId);
  const isLoginedState = useSelector(state=> state.main.isLogined);
  const isExistHistory = useSelector(state => state.main.existHistory);
  

  function logout() {
    dispatch(setUserName(""));
    dispatch(isLogined(false)); 
    dispatch(existHistory(false));
    dispatch(addHistory([]));
  }

  function getHistory() {
    dispatch(existHistory(true))
  }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const open = (anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button className={style.userBtn}  aria-describedby={id} variant="contained" onClick={handleClick}>
       {userNameState}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
        { anchorEl ? 
        <ul className={style.wrapper}>
          <li><Link className={style.link} onClick={ getHistory } to="/history">History</Link></li>
          <li className={style.link} onClick={logout}>Logout</li>
        </ul> : "" }
        </Typography>
      </Popover>
    </div>
  );
}
