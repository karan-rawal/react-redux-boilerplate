import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import './AppComponent.scss';

const image = require('../../assets/images/smiley.jpg');

const AppComponent = ({ posts }) => (
  <div className="text-danger make-underline">
      App Component Rendered. Test image:
    <img src={image} alt="Smiley" />
    {
      _.map(posts, post => (
        <div key={post.id}>
          {post.title}
        </div>
      ))
    }
  </div>
);

AppComponent.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AppComponent;
