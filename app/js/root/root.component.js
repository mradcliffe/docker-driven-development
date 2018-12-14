import React, { Component } from 'react';
import MessagesContainer from '../message/messages.container';

class RootComponent extends Component {
  render() {
    return (
      <div id="root">
        <header id="header" className="container">
          <h1>Guestbook</h1>
        </header>
        <main id="main" className="container">
          <MessagesContainer />
        </main>
        <footer id="footer"></footer>
      </div>
    );
  }
}

// RootComponent.propTypes = {};

export default RootComponent;
