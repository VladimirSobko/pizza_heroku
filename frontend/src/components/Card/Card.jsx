import React, { useState,useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Card.module.css';
import { addItemToCart, succesOrderDone } from '../../redux/slices/mainSlices';

export default function Card(props) {
  const currencyState = useSelector((state => state.main.currency));
  const dispatch = useDispatch();
  const {card} = props;

  function addToCart() {
    dispatch(addItemToCart(card))
    dispatch(succesOrderDone(false))
  }
  
  return (
    <div style={{ width: "25%", margin: "10px", border: "1px solid #4520ab",padding: "5px" }} >
      <h3 className={style.title}>{card.name}</h3> 
      <img  src={card.img} alt="pizza"/>
      <p className={style.description}>{card.description}</p>
      { currencyState === "usd" ? <h4> $ {card.priceUSD}</h4> : <h4> € {card.priceEUR}</h4>  } 
      <button className={ style.buttonOrder } onClick={ addToCart }>Order</button>
    </div>
  )
}
