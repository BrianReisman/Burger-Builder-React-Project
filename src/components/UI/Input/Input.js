import React from "react";
import classes from "./Input.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.invalid && props.shouldValidate && props.touched) { //*if the invalid prop passed in is true
    inputClasses.push(classes.Invalid); //*THEN, take my inputClasses array and add this classes.Invalid class onto it.
  }

  switch (
    props.elementType //*we're going to switch based on the value of props.inputType
  ) {
    case "input": //* if it matches this case...
      inputElement = (
        <input
          className={inputClasses.join(' ')} //*here we join with a space any classes in the inputClasses array above.
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      ); //*set inputElement to this value
      break; //*and then the end
    case "textarea": //* if it matches this case...
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value} onChange={props.changed}
        />
      ); //*set inputElement to this value
      break; //*and then the end
    case "select":
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map((option) => {
            return <option key={option.value} value={option.value}>{option.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
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
