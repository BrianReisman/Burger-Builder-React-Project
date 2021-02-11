//*.test.js is recagnized by CRA see in package.json

import React from "react"; //needed in order to render JSX in shallow() for instance.
import { configure, shallow } from "enzyme"; //prevents rendering an entire subtree, just direct decendants?
import Adapter from "enzyme-adapter-react-16";
import NavItems from "./NavItems";
import NavItem from "./NavItem/NavItem";

// outside of the describe function //*this connects enzyme
configure({ adapter: new Adapter() });

// describe(); [the Test] "Test Suites" //*a function that takes two arguments. 1. a string that describes the test you're writing 2. a function where you write the actual test.
// it(); [a Question on the Test] "Test" //*another function that allows you to write one individual test. It also takes two arguments. 1. again just a string describing this individual test. [Finish the sentence "it...."] 2. another function with the actual testing logic.
//
describe("<NavItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it("should render two <NavItem/> elements if not authenticated", () => {
    // const wrapper = shallow(<NavItems/>) //renders and store what is rendered in a const we can now test //*replaced with beforeEach()
    expect(wrapper.find(NavItem)).toHaveLength(2); //*NOT JSX
  });

  it("should render 3 <NavItem/> elements when authenticated", () => {
    // const wrapper = shallow(<NavItems isAuthenticated/>) //when passing a prop in just as the prop name it defaults to true //*replaced with beforeEach()
    // wrapper = shallow(<NavItems isAuthenticated/>) //*this works
    wrapper.setProps({ isAuthenticated: true }); //*this works too
    expect(wrapper.find(NavItem)).toHaveLength(3); //*NOT JSX
  });

  it('should contain "logout" btn if authenticated', () => {
    wrapper.setProps({isAuthenticated: true}) //*Because we call beforeEach() before each 'it' we need to setProps() again if we want that config.
    expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true)
  }); //*IS JSX... the Node is used here, the exact code is used.
});

//Enzyme allows you to render an individual component without needing to render the whole app.

//Any variable that stores a shallowly or otherwise rendered component has a method on it called .setProps() which you can call on the var that stores the return. You pass this method a JS object {} with key/value pairs where the keys are the prop names and values, the values.
