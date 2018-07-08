import React from 'react';
import AppComponent from '../component/AppComponent';

export default class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
    console.log('hello world');
  }

  render() {
    return (
      <AppComponent />
    );
  }
}
