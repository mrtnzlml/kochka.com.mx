// @flow

import React from 'react';

import './Home.css';
// import KochkaIcon from './KochkaIcon.svg';
import Rules from './Rules';

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        {/* <img src={KochkaIcon} className="Home-logo" alt="logo" /> */}
        <Rules />
      </div>
    );
  }
}
