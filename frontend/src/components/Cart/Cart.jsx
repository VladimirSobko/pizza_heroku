import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import FormDialog from '../Checkout/Checkout';
import { addItemToCart, decreaseItemQuantity, setTotalQuantity, setTotalSumOfOrder, removeItemFromCart } from '../../redux/slices/mainSlices';
import style from './Cart.module.css';


export default function Cart() {
  const dispatch = useDispatch();
  const currencyState = useSelector((state => state.main.currency));
  const orderList =  useSelector((state => state.main.cart.items));
  const succesOrder = useSelector((state => state.main.succesOrder));
  const arrOfOrderList = Object.values(orderList);
  const totalSum = useSelector((state => state.main.cart.totalSum ));
  const delivery = useSelector((state => state.main.delivery));
  const totatWithDelivery =  +totalSum + delivery;
  const totalQuantity = useSelector(state => state.main.cart.totalQuantity);

  const totalCountOfPizza = arrOfOrderList.reduce((acc, item) => {
    acc = acc + item.quantity;
    return  acc;
  },0)

  useEffect(() => {
    const totalSum = arrOfOrderList.reduce((acc, item) => {
      if(currencyState === "usd") {
        acc = acc + (item.quantity * item.priceUSD);
      } else {
        acc = acc + (item.quantity * item.priceEUR);
      }
      return  acc;
    },0);
    // setTotalSum(totalSum.toFixed(1));
    dispatch(setTotalQuantity(totalCountOfPizza));
    dispatch(setTotalSumOfOrder(totalSum.toFixed(2)))
  },[totalCountOfPizza,currencyState]);


   function removeFromCart(item) {
     dispatch(removeItemFromCart(item))
   }

  function increaseQuantity(item) {
    dispatch(addItemToCart(item))
  }

  function decreaseQuantity(item) {
    if(item.quantity !== 1 ) {
      dispatch(decreaseItemQuantity(item))
    } else {
      dispatch(removeItemFromCart(item))
    }
  }

  return (
    <>
    <header>
      <p>
        <Link to="/">
            Return to Main page
        </Link>
      </p>
    </header>
    <div className={style.wrapper}>
      <h3>Your Cart</h3>
      {
        succesOrder === false? 
          arrOfOrderList && arrOfOrderList.map((item,index) => {
            return (
                <div  className={style.itemInCart} key={index}>
                  <h5> {item.name} </h5>
                  { currencyState === "usd" ? 
                    <p>Price: $ {item.priceUSD}</p> : <p>Price: € {item.priceEUR} </p> 
                  }
                  <p>
                    <img style={{ maxWidth: "75px", maxHeight: "75px"  }} src={item.img} alt="img"/>
                  </p>
                  <div>
                    <button className={style.changeItem} onClick={() => decreaseQuantity(item)} > - </button>
                    <input className={style.inputValue} type="text" value={item.quantity}/>
                    <button className={style.changeItem} onClick={()=> increaseQuantity(item)} > + </button>
                  </div>
                  <button className={style.delete} onClick={() => removeFromCart(item)}>Delete</button>
                </div>
                )
              })
         : <p>
              <h2>Thank you, we are preparing your order...</h2>
              <h3>"Cart empty, but our shop no, choice something delicious"</h3> 
          </p>

      } 
       {
         arrOfOrderList.length === 0 ? "" : 
          <p>
            <h2> Subtotal : { totalSum } </h2>
            <p>Delivery: { currencyState === "usd" ?  <span>$</span> : <span>€</span>  } {delivery}</p>
            <h2> Total: { currencyState === "usd" ?  <span>$</span> : <span>€</span> } { totatWithDelivery.toFixed(2) }</h2>
       </p>
       }      
    </div>
    <div className={ style.wrapper }>
       {totalQuantity === 0? 
        <button className={style.choosePizza}>
            <Link to="/">
              CHOOSE PIZZA
            </Link>
      </button> : 
      <div>
        <FormDialog/> 
        <button className={style.choosePizza}>
            <Link to="/">
              CHOOSE PIZZA
            </Link>
      </button>
      </div>
      }  
    </div>
    </>
  )
}

