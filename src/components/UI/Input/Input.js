import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;

  switch (
    props.elementType //*we're going to switch based on the value of props.inputType
  ) {
    case "input": //* if it matches this case...
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      ); //*set inputElement to this value
      break; //*and then the end
    case "textarea": //* if it matches this case...
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      ); //*set inputElement to this value
      break; //*and then the end
    case "select":
      inputElement = (
        <select className={classes.InputElement} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label htmlFor="" className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
