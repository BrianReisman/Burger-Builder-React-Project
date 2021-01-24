import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

let burger = (props) => {
  console.log(props.ingredients)//!
  let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    console.log(igKey)
    console.log(props.ingredients[igKey])
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}/>;
    });
  })
  //reduce to figure if there is anything in the burger.
  .reduce((arr, el)=>{
    return arr.concat(el);
  }, []);

  if (transformedIngredients.length === 0){
    transformedIngredients = <p>Please add some ingredients you carb whore!</p>
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
