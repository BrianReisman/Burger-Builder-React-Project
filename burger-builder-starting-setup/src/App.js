import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>

        <Layout>
          <BurgerBuilder>teasdfst</BurgerBuilder>
        </Layout>

      </div>
    );
  }
}

export default App;