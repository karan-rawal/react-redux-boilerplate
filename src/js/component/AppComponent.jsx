import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import './AppComponent.scss';

const TIMEOUT_MINUTES = 2;

export default class AppComponent extends React.Component {
  static findWordFromIndex(fromIndex, originalText) {
    const text = originalText.slice(fromIndex);
    let word = '';
    for (let i = 0; i < text.length; i += 1) {
      word += text[i];
      if (text[i] === ' ') {
        return word;
      }
    }
    return word;
  }

  constructor(props) {
    super(props);
    this.state = {
      currentWordStartIndex: 0,
      remainingText: props.originalText, // remaining text
      correctText: '', // text that has been typed and correct
      typedText: '', // text that is currently in input
      gamerunning: false,
      timeStart: moment(),
      endTime: moment(),
      gameover: false,
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onIntervalTick = this.onIntervalTick.bind(this);
    this.textInput = React.createRef();
  }

  onIntervalTick() {
    const now = moment();
    const timeDiff = moment(now - this.state.timeStart);
    timeDiff.subtract(30, 'minutes');

    if (timeDiff.minutes() === TIMEOUT_MINUTES) {
      alert("Your speed: " + this.state.wpm);
      this.setState({
        gameover: true,
      });
      clearInterval(this.tickInterval);
    }

    const wpm = this.countWpm(now, this.state.timeStart);

    this.setState({
      endTime: timeDiff,
      wpm,
    });
  }

  onStart() {
    const timeDiff = moment(moment() - this.state.timeStart);

    timeDiff.subtract(30, 'minutes');
    this.setState({
      currentWordStartIndex: 0,
      remainingText: this.props.originalText, // remaining text
      correctText: '', // text that has been typed and correct
      typedText: '', // text that is currently in input
      gamerunning: true,
      timeStart: moment(),
      endTime: timeDiff,
      gameover: false,
    }, () => {
      this.textInput.current.value = '';
      this.textInput.current.focus();
    });


    clearInterval(this.tickInterval);
    this.tickInterval = setInterval(() => {
      this.onIntervalTick();
    }, 1000);
  }

  onTextChange(e) {
    const val = e.target.value;

    if ((this.state.correctText + val).length >= this.props.originalText.length) {
      alert("Your speed: " + this.state.wpm);
      this.setState({
        gameover: true,
      });
      clearInterval(this.tickInterval);
    }

    if (_.last(val) === ' ') {
      if (val === AppComponent.findWordFromIndex(this.state.currentWordStartIndex, this.props.originalText)) {
        e.target.value = '';
        this.setState({
          typedText: '',
          correctText: this.state.correctText + val,
          currentWordStartIndex: (this.state.correctText + val).length,
          remainingText: this.props.originalText.slice((this.state.correctText + val).length),
        });
        return;
      }
    }
    this.setState({
      typedText: val,
    });
  }

  countWpm(now, end) {
    const duration = moment.duration(now.diff(end));
    const seconds = duration.seconds();
    const minutes = duration.minutes();
    const wordsCount = this.state.correctText.trimRight().split(' ').length;
    const totalTimeElapsedSeconds = (minutes) * 60 + seconds;
    const wordsPerSecond = wordsCount / totalTimeElapsedSeconds;
    return wordsPerSecond * 60;
  }

  calculateCorrectPartial() {
    let correctWord = '';
    if (!this.state.typedText.length) {
      return '';
    }
    for (let i = 0; i < this.state.typedText.length; i += 1) {
      if (this.state.remainingText[i] === this.state.typedText[i]) {
        correctWord += (this.state.remainingText[i]);
      } else {
        return correctWord;
      }
    }
    return correctWord;
  }

  calculateIncorrectPartial() {
    let incorrectWord = '';
    if (!this.state.typedText.length) {
      return '';
    }
    let foundIncorrect = false;
    for (let i = 0; i < this.state.typedText.length; i += 1) {
      if ((this.state.remainingText[i] !== this.state.typedText[i]) || foundIncorrect) {
        foundIncorrect = true;
        incorrectWord += (this.state.remainingText[i]);
      }
    }
    return incorrectWord;
  }

  calculateRemainingText(correctPartial, incorrectPartial) {
    // compare typed text and remaining
    return this.state.remainingText.slice(correctPartial.length + incorrectPartial.length);
  }

  render() {
    const correctPartial = this.calculateCorrectPartial();
    const incorrectPartial = this.calculateIncorrectPartial();

    return (
      <div>
        <div>
          Time: { this.state.gamerunning && this.state.endTime.format('mm:ss')}
        </div>
        <div>
          WPM: {this.state.wpm}
        </div>
        <div>
          <span className="correct">{this.state.correctText}</span>
          <span className="correct partial">{correctPartial}</span>
          <span className="incorrect partial">{incorrectPartial}</span>
          <span className="cursor">
            |
          </span>
          <span>
            {this.calculateRemainingText(correctPartial, incorrectPartial)}
          </span>
        </div>
        <input
          ref={this.textInput}
          disabled={!this.state.gamerunning || this.state.gameover}
          onChange={this.onTextChange}
          defaultValue={this.state.typedText}
          type="text"
        />
        <br />
        <button type="button" onClick={this.onStart}>Start</button>
      </div>
    );
  }
}

AppComponent.propTypes = {
  originalText: PropTypes.string,
};

AppComponent.defaultProps = {
  originalText: '',
};
