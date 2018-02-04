const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Profile');
// other components
const Header = require('./Header');
const AnotherUserPin = require('./AnotherUserPin');

/* the "Profile" component. Showsuser profile and allows user to add a card" */
class AnotherUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: this.props.match.params.user.split("$")[1],
        displayName: this.props.match.params.user.split("$")[0],
        pins: <div className="loader"></div>
    }
  }
  /*******************/
  // Prerender methods
  /*******************/
  componentWillMount() {
    //get user information
    let that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/another-user-inf', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    let body = 'displayName=' + encodeURIComponent(this.state.displayName) +
      '&username=' + encodeURIComponent(this.state.username);

    xhr.send(body);

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
        return;
      }
      let response = JSON.parse(this.responseText);
      let pins = "";
      if(response.pins !== undefined) {
        pins = response.pins.map((e) => {
          return <AnotherUserPin img_url={e.img_url} description={e.description} key={e.img_url+e.description}/>;
        });
      }                          
      that.setState({
        ["pins"]: pins
         });
    }
  }
  /*******************/
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1 id="profile-h">{this.state.displayName}'s pins</h1>
          <div className="pins">
            {this.state.pins}
          </div>
        </div>
      </div>
    );
  }
};

module.exports = AnotherUserProfile;