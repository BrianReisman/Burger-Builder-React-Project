import React, { Component } from "react";
import {connect} from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get('https://react-my-burger-d8ef0-default-rtdb.firebaseio.com/ingredients.json') //.json added before firebase requires it
    //   .then(res => {
    //     this.setState({ ingredients: res.data })
    //   })
    //   .catch(err => {
    //       this.setState({ error: true })
    //   })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients) //and array of object values
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
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
    if (oldCount <= 0) {
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // // alert("You continue!");
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      ); //* encodeURIComponent helps with formatting like removing white space
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disableInfo = {
      //1) this contains all of the ingredients' states
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0; //2)this updates the copied state objects with boolean values.
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disable={disableInfo} //3) we are now passing the state containing booleans under the name 'disable'
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      // orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  console.log(state.ingredients)
  return {
    //*ings will be the key of this mapped state object being passed to *this* component.
    //*the value of this will be the global state.ingredients
    ings: state.ingredients
  };
}

const mapDispatchToProps = (dispatch) => {
  return{
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

