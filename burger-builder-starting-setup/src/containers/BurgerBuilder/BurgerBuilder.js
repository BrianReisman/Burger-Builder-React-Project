import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
  };

  updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients) //and array of object values
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)
    this.setState({purchaseable: sum > 0})
  }

  addIngredientHandler = (type) => {
    //ingredient -
    const oldCount = this.state.ingredients[type]; //get the VALUE current state of this type of ingredient
    const updatedCount = oldCount + 1; //take that value and increase it by one.
    const updatedIngredients = { ...this.state.ingredients }; //make a copy of the whole slice of state.
    updatedIngredients[type] = updatedCount; //take the new value that had 1 added to it and apply it to the copy of state applied specifically for the appropriate ingrediant.

    //cost -
    const priceAddition = INGREDIENT_PRICES[type]; //get the price for the ingredient being handled.
    const oldPrice = this.state.totalPrice; //get the current total price from within state.
    const newPrice = oldPrice + priceAddition; //using the state and the ingredient price you grabbed add them together.

    //update both slices of state.
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    //ingredient -
    const oldCount = this.state.ingredients[type]; //get the VALUE current state of this type of ingredient
    if (oldCount <= 0 ){
      return;
    }
    const updatedCount = oldCount - 1; //take that value and increase it by one.
    const updatedIngredients = { ...this.state.ingredients }; //make a copy of the whole slice of state.
    updatedIngredients[type] = updatedCount; //take the new value that had 1 added to it and apply it to the copy of state applied specifically for the appropriate ingrediant.

    //cost -
    const priceSubtraction = INGREDIENT_PRICES[type]; //get the price for the ingredient being handled.
    const oldPrice = this.state.totalPrice; //get the current total price from within state.
    const newPrice = oldPrice - priceSubtraction; //using the state and the ingredient price you grabbed add them together.

    //update both slices of state.
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disableInfo = {     //1) this contains all of the ingredients' states
      ...this.state.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0; //2)this updates the copied state objects with boolean values.
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disable={disableInfo} //3) we are now passing the state containing booleans under the name 'disable'
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
