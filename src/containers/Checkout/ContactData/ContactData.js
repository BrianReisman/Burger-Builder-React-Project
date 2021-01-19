import React, { Component } from "react";
import { render } from "react-dom";
import Button from "../../../components/UI//Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    
    const formData = {}; //empty object initially
    for (let formElementIdentifier in this.state.orderForm){ //*formElementIdentifier is name, email, country, etc
      //*take formData (the empty object above) and dynamically based on which element we are on in our for/in loop create a property and assige it the value of this.state.orderForm[dynamically choose the element that we are dealing with in this iteration through the loop].value.
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }



    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //for ecomm, recalc price on server to prevent people from tampering with it.
      orderData: formData
    };
    axios
      .post("/orders.json", order) //adding .json is needed for firebase specifically. The path you want to send your data to
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });

    console.log(this.props.ingredients);
  };

  inputChangedHandler = (e, inputId) => {
    const updatedOrderForm = { //*this is a new (but shallow) copy of this.state.orderForm which means it only contains the
      //*orderForm object and *its* key/value pairs. We can mutate the value of this.state.orderForm.name for instance
      //*but what we cannot do, that we want to do, is mutate the value of this.state.orderForm.name.value. For that...
      ...this.state.orderForm
    };
    const updatedFormElement = { //*We now need to make a copy of the nested level
      ...updatedOrderForm[inputId] //* which is a copy of what we copied above, drilling one level further down, into the
      //*property of this.state.orderForm dynamically based on the inputID we get from the onChange
    };
    updatedFormElement.value = e.target.value;
    updatedOrderForm[inputId] = updatedFormElement //*the big object
    this.setState({orderForm: updatedOrderForm})
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    console.log(this.props);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            elementType={formElement.config.elementType}
            value={formElement.config.value}
            changed={(event)=>{this.inputChangedHandler(event, formElement.id)}}
          />;
        })}
        <Button btnType="Success">
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
