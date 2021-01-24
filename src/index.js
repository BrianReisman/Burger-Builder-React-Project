import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; //Wrap everything with the Provider including BrowserRouter so that the store in Provider is supplied to all routes?
import {createStore} from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);
console.log(store)
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
