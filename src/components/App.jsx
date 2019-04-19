import React, { Component } from 'react';
import { connect } from 'react-redux';
import TweetInputBox from './TweetInputBox';
import './App.css';
import Footer from './Footer/Footer';

export class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">React Twitter</h1>
        {!this.props.user.id && <p>Login to React Boulder Twitter to post your thoughts!</p>}
        {this.props.user.id && <TweetInputBox />}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(App);
