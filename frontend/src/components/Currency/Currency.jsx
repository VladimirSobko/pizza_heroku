import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Currency.module.css';
import { setCurrency } from '../../redux/slices/mainSlices';

export default function Currency() {
  const currencyState = useSelector((state => state.main.currency));
  const [valueCurrency, setValue] = useState(currencyState);
  const dispatch = useDispatch();
  
  function choiceCurrency() {
    if(currencyState !== "eur") {
      setValue('eur')
      dispatch(setCurrency("eur"))
    } else {
      setValue('usd')
      dispatch(setCurrency("usd"))
    }
  }

  return (
    <>
    <select onChange={choiceCurrency} value={valueCurrency} className={style.currency} >
      <option value="usd" name="dollar">USD</option>
      <option value="eur" name="euro">EUR</option>
    </select>
    </>
  )
}
