import React from "react";
import style from './Header.module.css';
import Nav from '../Nav/Nav';

export default function Header() {
  return (
    <div>
       <header style={style.header}>
        <Nav/>
      </header>
    </div>
  )
}
