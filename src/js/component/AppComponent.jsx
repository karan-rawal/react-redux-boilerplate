import React from 'react';
import './AppComponent.scss';

const image = require('../../assets/images/smiley.jpg');

const AppComponent = () => (
  <div className="text-danger make-underline">
      App Component Rendered. Test image:
    <img src={image} alt="Smiley" />
  </div>
);

export default AppComponent;
