import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey} >
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order is ready!</h3>
      <p>A delicous burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Your total comes to: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>

      <Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType={'Success'} clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
