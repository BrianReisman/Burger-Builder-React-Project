import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => (
  <header className={classes.Toolbar}>
  <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div onClick={props.click}>MENU</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <NavItems />
    </div>
  </header>
);

export default toolBar;
