import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((item) => (
      <BuildControl
        key={item.label}
        label={item.label}
        added={() => props.ingredientAdded(item.type)}
        removed={() => props.ingredientRemoved(item.type)}
        disabled={props.disable[item.type]} //4) props.disable is how this comp got it. It is being 'forwarded' under the name 'disabled' to each individual component only containing the boolean value of its ingredient.
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchaseable}>
      ORdER NoW
    </button>
  </div>
);

export default buildControls;
