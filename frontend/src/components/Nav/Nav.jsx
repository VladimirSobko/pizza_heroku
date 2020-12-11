import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from "react-router-dom";
import Currency from '../Currency/Currency';
import style from './Nav.module.css';
import Popover from '../Popover/Popover';
import PopoverForUser from '../PopoverForUser/PopoverForUser';

export default function Nav() {
  const dispatch = useDispatch();
  const stateOfCart = useSelector(state => state.main.showCartList);
  const userNameState = useSelector(state => state.main.userName);

  return (
    <>
        <ul className={style.list}>
          { userNameState === "" ?
          <>
          <li className={ style.item}>
            <Link to="/login">
                 Sign IN
            </Link>
          </li>
          <li className={ style.item}>
              <Link to="/registration">
                 Sign UP 
              </Link>
          </li> 
          </> : 
          <li className={ style.item}>
              <PopoverForUser/>
          </li> 
        }
          <li className={ style.item}>
            <Currency/>
          </li>
          <li className={ style.item}>
            <Popover/>
          </li>
        </ul>
    </>
  )
}
