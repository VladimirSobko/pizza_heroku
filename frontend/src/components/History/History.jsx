import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory } from '../../redux/slices/mainSlices';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from "react-router-dom";
import Header from '../Header/Header';
import style from './History.module.css';

export default function History() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.main.userId);
  const isExistHistory = useSelector(state => state.main.existHistory);
  const historyListOfOrder = useSelector((state) => state.main.history);
  const succesOrderState = useSelector((state) => state.main.succesOrder);

  
  useEffect(() => {
    if(isExistHistory === true) {
      (async() => {
        const response = await fetch('/history', {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });
        const result = await response.json();
        dispatch(addHistory(result.order));
      })();
    }
  },[])

  return (
    <div className={style.wrapper}>
      <Header/>
      <h1>History of orders</h1>
      <div>
       {
         historyListOfOrder &&
          historyListOfOrder.map((item,index) => {
            return (
              <>
              <hr/>
              <div  key={index}>
                {item.order[0] && Object.keys(item.order[0].items).map((el,i)=> {
                  return (
                  <span className={style.each} key={i}>{i+1}. "{ item.order[0].items[el].name }", </span>
                  )
                }) }
              </div>
              <p style={{marginTop: "5px"}}>Total sum: {item.order[0].totalSum}</p>
              <p>Street: {item.street}</p>
              <p>House: {item.house}</p>
              <p>Apartment : {item.apartment}</p>
              <p>Date of order : {item.date}</p>
              </>
            )
          })
          }
      </div>
      <div>
        
      </div>
      <div>
          <button className={style.choosePizza}>
            <Link  to="/">Main</Link>
          </button>
      </div>
    </div>
  )
}
