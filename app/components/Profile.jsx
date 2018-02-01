const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Profile');
// other components
const Header = require('./Header');

const masonryOptions = {
    transitionDuration: 0
};

/* the "Profile" component. Showsuser profile and allows user to add a card" */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        displayName: ""
    }
  }
  /*******************/
  // Prerender methods
  /*******************/
  componentWillMount() {
    //get user information
    let that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/user-inf', true);

    xhr.send();

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
        return;
      }
      let response = JSON.parse(this.responseText);

      that.setState({
        ["displayName"]: response.displayName
         });
    }
  }
  /*******************/
  render(){
    return (
      <div>
        <Header />
        <div className="container">
          <h1 id="profile-h">Hello, {this.state.displayName}</h1>
          <div className="pins">
            <div className="pin">
              <img src="" className="pin-img"></img>
              <div className="description">description</div>
            </div>
          </div>
        </div>
        {/* modal for adding new pin */}
      </div>
    );
  }
};

module.exports = Profile;