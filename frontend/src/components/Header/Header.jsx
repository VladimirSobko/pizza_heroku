import React from "react";
import style from './Header.module.css';
import Nav from '../Nav/Nav';

export default function Header() {
  return (
       <header style={style.header}>
        <h3 className={style.title}>Mario Pizza</h3>
        <Nav/>
      </header>
  )
}
