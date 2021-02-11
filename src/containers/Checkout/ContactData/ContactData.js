import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";

import Button from "../../../components/UI//Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          //*the html attributes
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        validation: {},
        valid: true,
        value: "cheapest",
      },
    },
    formIsValid: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {}; //empty object initially
    for (let formElementIdentifier in this.state.orderForm) {
      //*formElementIdentifier is name, email, country, etc
      //*take formData (the empty object above) and dynamically based on which element we are on in our for/in loop create a property and assige it the value of this.state.orderForm[dynamically choose the element that we are dealing with in this iteration through the loop].value.
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price, //for ecomm, recalc price on server to prevent people from tampering with it.
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token); //*from mapDispatchToProps
  };

  inputChangedHandler = (e, inputId) => {

    const updatedFormElement = updateObject(this.state.orderForm[inputId], {
      value: e.target.value,
      valid:checkValidity(
        e.target.value,
        this.state.orderForm[inputId].validation
      ),
      touched:true
    })
const updatedOrderForm = updateObject(this.state.orderForm, {
  [inputId]: updatedFormElement
})

    // const updatedOrderForm = {
    //   //*this is a new (but shallow) copy of this.state.orderForm which means it only contains the
    //   //*orderForm object and *its* key/value pairs. We can mutate the value of this.state.orderForm.name for instance
    //   //*but what we cannot do, that we want to do, is mutate the value of this.state.orderForm.name.value. For that...
    //   ...this.state.orderForm,
    // };


    // const updatedFormElement = { //*replaced with updateObject()
    //   //*We now need to make a copy of the nested level
    //   ...updatedOrderForm[inputId], //* which is a copy of what we copied above, drilling one level further down, into the
    //   //*property of this.state.orderForm dynamically based on the inputID we get from the onChange
    // };
    // updatedFormElement.value = e.target.value;
    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );
    // updatedFormElement.touched = true;

    // updatedOrderForm[inputId] = updatedFormElement; //*the big object
    console.log(updatedFormElement);

    let formIsValid = true;
    for (let inputIdentifiers in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }
    //*first formIsValid is the property in state, the second formIsValid on the right of : is the local var.
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementConfig={formElement.config.elementConfig}
              elementType={formElement.config.elementType}
              value={formElement.config.value}
              changed={(event) => {
                this.inputChangedHandler(event, formElement.id);
              }}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
            />
          );
        })}
        {/* //*this is not an HTML button so disabled is a prop passed and needs to be added to the components HTML button attribute. */}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading, //*Notice this .order. comes from a different one than .burgerBuilder.
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //!Don't forget to return
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
