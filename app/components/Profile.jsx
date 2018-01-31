const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Profile');
// other components
const Header = require('./Header');

/* the "Profile" component. Showsuser profile and allows user to add a card" */
const Profile = function() {
  return (
    <div>
      <Header />
      <h1>PROFILE</h1>
    </div>
  );
};

module.exports = Profile;