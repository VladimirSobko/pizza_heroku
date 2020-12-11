import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter,
  useHistory
} from "react-router-dom";
import { setPizzaFromDB, setLoadingState } from '../../redux/slices/mainSlices';
import LinearProgress from '../Spinner/Spinner';
import Card from '../Card/Card';
import style from './Main.module.css';


export default function Main() {
  const dispatch = useDispatch();
  const stateOfCart = useSelector(state => state.main.showCartList);
  const isLoginedState = useSelector(state=> state.main.isLogined);
  const pizzas = useSelector(state => state.main.pizzas);
  const isLoading = useSelector(state => state.main.loading);

  useEffect(() => {
    (async() => {
      if(isLoginedState === false) {
        const response = await fetch('/logout');
        const result = await response.json();
      }
    })();     
  },[isLoginedState]);

  useEffect(() => {
    (async() => {
      const response = await fetch('/main');
      const arrayOfPizza = await response.json();
      dispatch(setPizzaFromDB(arrayOfPizza));
      if(response.status === 200) {
        dispatch(setLoadingState(false));
      }
    })();
  },[isLoading]);

  return (
    <>
      <main style={style.main}>
        {
          isLoading? <LinearProgress/> :
          pizzas && pizzas.map((card,index) => {
            return (
            <Card key={index} card={card} index={index}/>
            )
          })
        }         
      </main>
    </>
  )
}
 