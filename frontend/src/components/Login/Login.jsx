import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  useHistory
} from "react-router-dom";
import { isLogined, setUserName, setUserId } from '../../redux/slices/mainSlices';
import style from './Login.module.css';

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputState, setInputState] = useState({});

  useEffect(() => {
    (async() => {
      const {email,  password} = inputState;
      if(inputState !== {}) {
        const response =  await fetch('/signIn', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const result = await response.json();  
        if(result.answer !== 'no') {
          dispatch(setUserName(result.name));
          dispatch(setUserId(result.id))
          dispatch(isLogined(true))
          history.push('/');
        } 
      }
   })();
  },[inputState])

  function signInUser(e) {
    e.preventDefault();
    const { email: { value: email } } = e.target;
    const { password: { value: password } } = e.target;
    setInputState({email, password});
  }
  return (
    <>
        <header>
          <Link to="/">
              <p> Go to Main </p>
          </Link>
        </header>
        <div>
        <h3>Please, sign in</h3>
        <form autoComplete="off" onSubmit={signInUser}>
          <span>Email</span>
          <input className={style.input} name="email" type="text" placeholder="email" required minLength="2" />
          <span>Password</span>
          <input className={style.input} type="password" name="password" placeholder="password" required minlength="6"/>
          <button className={style.submit}>Submit</button>
        </form>
      </div>
  </>
  )
}
