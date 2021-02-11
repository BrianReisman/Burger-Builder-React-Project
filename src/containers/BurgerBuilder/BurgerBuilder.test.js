//how to connect a container.
//1. export by name the class or componnet so you can access it without connect+Redux
//2 shallowly render it and supply it with the props it needs A. in the shollow() like onInitIngredients [[which is an empty arrow function because it needs to receive something? Not sure why arrow function satisfies this while 'true' does not]] or in setProps() like on line 22.

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe('testing <BurgerBuilder/> container', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
  })


  it('should render <BuildControls/> when recieving ingredients', ()=>{
    wrapper.setProps({ings: {salad: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })

})