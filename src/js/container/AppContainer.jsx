import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppComponent from '../component/AppComponent';
import { getPosts } from '../action/AppActions';

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
    console.log('hello world');
  }

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { isFetchingPosts, error, posts } = this.props.reducer;
    return (
      <AppComponent isFetchingPosts={isFetchingPosts} error={error} posts={posts} />
    );
  }
}

AppContainer.propTypes = {
  getPosts: PropTypes.func.isRequired,
  reducer: PropTypes.shape({
    isFetchingPosts: PropTypes.bool,
    posts: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  reducer: state.AppReducer,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => { dispatch(getPosts()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
