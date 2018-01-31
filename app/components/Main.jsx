const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Main');
// other components
const Header = require('./Header');

/* the main page for the index route of this app */
const Main = function() {
  return (
    <div>
      <Header />
      <div className="container">
        <h1 id="pin-h">Pinte|tser clone</h1>
        <img src="https://cdn.glitch.com/d0a9fa01-c793-4626-96bf-78dafffa6d19%2Fpinterest-logo.png?1517425954465" id="pin-img"></img>
        <p id="pin-p">sign up now and create your own pinterest board</p>
      </div>
    </div>
  );
};

module.exports = Main;