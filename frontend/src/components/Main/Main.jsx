import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter,
  useHistory
} from "react-router-dom";

import Card from '../Card/Card';
import style from './Main.module.css';
import logoCheese from '../../img/cheese.jpg';
import logoBBQ from '../../img/bbq.jpg';
import double from '../../img/double-pepperoni.jpg';
import hawaiian from '../../img/hawaiian.jpg';
import margo from '../../img/margherita.jpeg';
import meat_fest from '../../img/meat-fest.jpg';
import mexican from '../../img/mexican.jpg';
import vegan_veggie from '../../img/vegan-veggie.jpeg';



export default function Main() {
  const stateOfCart = useSelector(state => state.main.showCartList);
  const isLoginedState = useSelector(state=> state.main.isLogined);

  useEffect(() => {
    (async() => {
      if(isLoginedState === false) {
        const response = await fetch('/logout');
        const result = await response.json();
      }
    })();     
  },[isLoginedState]);

  const data = [ 
    {
      name: "Cheese",
      priceUSD: 3.25,
      priceEUR: 2.72,
      img: logoCheese,
      description: "Cheese, tomato",
      id: 1,
    },
    {
      name: "Barbeque",
      priceUSD: 5.00,
      priceEUR: 4.18,
      img: logoBBQ,
      description: "Cheese, chicken, tomato, papric",
      id: 2,
    },
    {
      name: "Double-pepperoni",
      priceUSD: 3.00,
      priceEUR: 2.51,
      img: double,
      description: "Cheese, chicken, tomato, papric",
      id: 3,
    },
    {
      name: "Hawaiian",
      priceUSD: 3.75,
      priceEUR: 3.13,
      img: hawaiian,
      description: "Cheese, chicken, pine-apple",
      id: 4,
    },
    {
      name: "Margherita",
      priceUSD: 3.00,
      priceEUR: 2.51,
      img: margo,
      description: "Cheese, tomato",
      id: 5,
    },
    {
      name: "Meat-fest",
      priceUSD: 3.50,
      priceEUR: 2.92,
      img: meat_fest,
      description: "Cheese, chicken, meat, tomato, papric",
      id: 6,
    },
    {
      name: "Mexican",
      priceUSD: 3.00,
      priceEUR: 2.51,
      img: mexican,
      description: "Cheese, chicken, papric, onion",
      id: 7,
    },
    {
      name: "Vegan",
      priceUSD: 3.00,
      priceEUR: 2.51,
      img: vegan_veggie,
      description: "Tomato, papric, pine-apple,onion",
      id: 8,
    },
  ];

  return (
    <>
      <main style={style.main}>
          {data.map((card,index) => {
            return (
            <Card key={index} card={card} index={index}/>
            )
          })}
          
      </main>
    </>
  )
}
 