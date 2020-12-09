import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  useHistory,
} from "react-router-dom";
import { isLogined, setUserName,setUserId } from '../../redux/slices/mainSlices';
import style from './Registration.module.css';


export default function Registration() {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({});
  const history = useHistory();


  useEffect(() => {
    (async() => {
      const {name, email, password} = inputState;
      if(inputState !== {}) {
        const response =  await fetch('/signUp', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            id: Math.random(),
          }),
        });
        const result = await response.json(); 
        if(result !== { answer: 'sorry, name has existed yet'}) {
          dispatch(setUserName(result.name))
          dispatch(setUserId(result.id))
          dispatch(isLogined(true))
          history.push('/');
        }
      }
   })();
  },[inputState])

  function signUpUser(e) {
    e.preventDefault();
    const { name: { value: name } } = e.target;
    const { email: { value: email } } = e.target;
    const { password: { value: password } } = e.target;
    setInputState({name,email,password});
  }

  return (
    <>
      <header>
        <Link to="/">
            <p>Go to Main</p>
        </Link>
      </header>
      <div>
        <h3>Please,sign up </h3>
        <form autoComplete="off" style={style.form} onSubmit={signUpUser}>
          <span>Name</span>
          <input className={style.input} name="name" type="text" placeholder="name" required minlength="2" pattern="^[a-zA-Z]+$"/>
          <span>Email</span>
          <input className={style.input} name="email" type="email" placeholder="email" required />
          <span>Password</span>
          <input className={style.input} type="password" name="password" placeholder="password" required minlength="6"/>
          <button className={style.submit}> Submit </button>
        </form>
      </div>
    </>
  )
}
