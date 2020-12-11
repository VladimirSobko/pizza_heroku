import React, { useState, useEffect } from  'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, succesOrderDone, decreaseItemQuantity, removeItemFromCart } from '../../redux/slices/mainSlices';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter,
  useHistory
} from "react-router-dom";
import { setTotalQuantity, setTotalSumOfOrder } from '../../redux/slices/mainSlices';
import style from './Popover.module.css';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover() {
  const [totalSum, setTotalSum] = useState(0);
    const dispatch = useDispatch();
    const currencyState = useSelector((state => state.main.currency));
    const orderList =  useSelector((state => state.main.cart.items));
    const arrOfOrderList = Object.values(orderList);
  
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
      setTotalSum(totalSum.toFixed(1));
      dispatch(setTotalQuantity(totalCountOfPizza));
      dispatch(setTotalSumOfOrder(totalSum.toFixed(2)))
    }, [totalCountOfPizza,currencyState])
    

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

  function increaseQuantity( item) {
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
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
       Cart {totalCountOfPizza && totalCountOfPizza > 0? totalCountOfPizza : "" }
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
        { anchorEl ? <div> 
          <div> { arrOfOrderList && arrOfOrderList.map((item,index) => {
          return (
          <p className="itemInCart" key={index}>
            <h5> {item.name} </h5>
            { currencyState === "usd" ? 
              <span classNane={style.spanCurrency}>$ {item.priceUSD}</span>  : <span>€ {item.priceEUR} </span> 
            }
            <img style={{ maxWidth: "50px", maxHeight: "50px"  }} src={item.img} alt="img"/>
            <button className={ style.changeItem } onClick={() => decreaseQuantity(item)}>-</button>
            <input className={ style.inputValue } type="text" value={item.quantity}/>
            <button className={ style.changeItem } onClick={()=> increaseQuantity(item) }>+</button>
          </p>
          )
        }) }
         </div>
        </div> : "" }
        { arrOfOrderList.length === 0 ? <p className={style.empty}> "Sorry, your cart is empty" </p>  : <Link className={style.linkToCart} to="/cart">Go to Cart</Link> }
        </Typography>
      </Popover>
    </div>
  );
}


// import { useDispatch, useSelector } from 'react-redux';
// import { addItemToCart, succesOrderDone, decreaseItemQuantity } from '../../redux/slices/mainSlices';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link, BrowserRouter,
//   useHistory
// } from "react-router-dom";
// import style from './Popover.module.css';

// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { setTotalQuantity, setTotalSumOfOrder } from '../../redux/slices/mainSlices';


// const useStyles = makeStyles((theme) =>
//   createStyles({
//     typography: {
//       padding: theme.spacing(2),
//     },
//   }),
// );

// export default function PopoverForUser() {
//   const [totalSum, setTotalSum] = useState(0);
//   const dispatch = useDispatch();
//   const currencyState = useSelector((state => state.main.currency));
//   const orderList =  useSelector((state => state.main.cart.items));
//   const arrOfOrderList = Object.values(orderList);

//   const totalCountOfPizza = arrOfOrderList.reduce((acc, item) => {
//     acc = acc + item.quantity;
//     return  acc;
//   },0)

//   useEffect(() => {
//     const totalSum = arrOfOrderList.reduce((acc, item) => {
//       if(currencyState === "usd") {
//         acc = acc + (item.quantity * item.priceUSD);
//       } else {
//         acc = acc + (item.quantity * item.priceEUR);
//       }
//       return  acc;
//     },0);
//     setTotalSum(totalSum.toFixed(1));
//     dispatch(setTotalQuantity(totalCountOfPizza));
//     dispatch(setTotalSumOfOrder(totalSum.toFixed(2)))
//   }, [totalCountOfPizza,currencyState])
  
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(!anchorEl);
//   };

//   const open = (anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   function increaseQuantity( item) {
//     dispatch(addItemToCart(item))

//   }

//   function decreaseQuantity(item) {
//     if(item.quantity !== 0 ) {
//       dispatch(decreaseItemQuantity(item))
//     }
//   }

//   return (
//     <div>
//       <Button style={{ marginTop: "40%", backgroundColor: "#edeef1", fontWeight: "bold", fontSize: "14px" }}  aria-describedby={id} variant="contained" onClick={handleClick}>
//        Cart {totalCountOfPizza && totalCountOfPizza > 0? totalCountOfPizza : "" }
//       </Button>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         <Typography className={classes.typography}>
//         { anchorEl ? <div> 
//           <div> { arrOfOrderList && arrOfOrderList.map((item,index) => {
//           return (
//           <p className="itemInCart" key={index}>
//             <h5> {item.name} </h5>
//             { currencyState === "usd" ? 
//               <span>$ {item.priceUSD}</span>  : <span>€ {item.priceEUR} </span> 
//             }
//             <img style={{ maxWidth: "50px", maxHeight: "50px"  }} src={item.img} alt="img"/>
//             <button className={ style.changeItem } onClick={() => decreaseQuantity(item)}>-</button>
//             <input className={ style.inputValue } type="text" value={item.quantity}/>
//             <button className={ style.changeItem } onClick={()=> increaseQuantity(item) }>+</button>
//           </p>
//           )
//         }) }
//          </div>
//         </div> : "" }
//         { arrOfOrderList.length === 0 ? <p> "Sorry, your cart is empty" </p>  : <Link className={style.linkToCart} to="/cart">Go to Cart</Link> }
//         </Typography>
//       </Popover>
//     </div>
//   );
// }

