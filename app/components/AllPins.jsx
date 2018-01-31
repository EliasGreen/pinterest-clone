const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/AllPins');
// other components
const Header = require('./Header');

/* the "AllPins" component. Shows all pins using "cards" */
const AllPins = function() {
  return (
    <div>
      <Header />
      <h1>ALL PINS</h1>
    </div>
  );
};

module.exports = AllPins;