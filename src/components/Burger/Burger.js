import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

let burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}/>;
    });
  })
  //reduce to figure if there is anything in the burger.
  .reduce((arr, el)=>{
    return arr.concat(el);
  }, []);

  if (transformedIngredients.length === 0){
    transformedIngredients = <p>Please select the ingredients you'd like to add to your burger!</p>
  }
  
return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;
