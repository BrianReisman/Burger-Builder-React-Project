import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  // console.log(attachedClasses.join(" "));

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} Side={'From SideDrawer'} />

      <div className={attachedClasses.join(' ')} onClick={props.closed}>
      {/* <div className={classes.SideDrawer}> */}
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
      
    </Aux>
  );
};

export default sideDrawer;
