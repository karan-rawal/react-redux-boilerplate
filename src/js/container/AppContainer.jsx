import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTextData } from '../action/AppActions';
import AppComponent from '../component/AppComponent';

class AppContainer extends React.Component {
  static formatPlainTextIntoArray(text = 'Karan stasdf asdf') {
    // TODO Remove later
    const split = text.split('');

    let wordIndex = 0;
    const formattedArray = split.map((val, index) => {

      if (val === ' ') {
        wordIndex += 1;
      }

      return {
        letter: val,
        wordIndex,
        letterIndex: index,
      };
    });

    console.error(formattedArray);
  }

  constructor(props) {
    super(props);
    this.props.fetchTextData();
  }


  render() {
    const { textData } = this.props;
    const { isLoading, data, error } = textData;
    const rawText = (data && data.text_out) || '';
    const plainText = rawText.replace(/(&nbsp;|<([^>]+)>)/ig, '');

    return (
      <div>
        {
          isLoading && (
            <div>
              Loading...
            </div>
          )
        }

        {
          !!error && (
            <div>
              Some Error Occurred.
            </div>
          )
        }

        {
          !!data && (
            <div>
              <AppComponent originalText={'a quick brown fox jumped over the lazy cow'} />
            </div>
          )
        }

      </div>
    );
  }
}

AppContainer.propTypes = {
  fetchTextData: PropTypes.func.isRequired,
  textData: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.any,
    error: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  textData: state.AppReducer.textData,
});

const mapDispatchToProps = dispatch => ({
  fetchTextData: () => { dispatch(fetchTextData()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
