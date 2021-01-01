import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) =>  (
    <ul className={classes.NavItems}>
      <NavItem link='/' active>Burger Builder</NavItem>
      <NavItem link='/'>Checkout Page</NavItem>
    </ul>
  );

export default navItems;