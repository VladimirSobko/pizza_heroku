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
        <ul style={style.ul}>
         
            {/* <li style={style.ul}>
              <Link to="/">Main </Link>
            </li> */}
          { userNameState === "" ?
          <>
          
            <li style={style.ul}>
            <Link to="/login">
                 Sign IN
            </Link>
            </li>
          <Link to="/registration">
               <li style={style.ul}>Sign UP</li>
          </Link>
          </> : <li>
                  <PopoverForUser/>
               </li> 
        }
        </ul>
        <Currency/>
        <Popover/>
    </>
  )
}
