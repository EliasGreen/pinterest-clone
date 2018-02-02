const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/UserPin');

/* the UserPin component (contains: pin card). Shows pin card in user profile*/
class UserPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: this.props.img_url,
      description: this.props.description
    };
    this.handleDeletePin = this.handleDeletePin.bind(this);
  }
  /*******************/
  // Handlers
  /*******************/
  handleDeletePin() {
    let that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/delete-pin', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    let body = 'imgurl=' + encodeURIComponent(this.state.img_url) +
      '&description=' + encodeURIComponent(this.state.description);
    
    xhr.send(body);

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
        return;
      }
      let response = JSON.parse(this.responseText);

      if(response.error == "none") window.location = "/profile";
    }
  }
  /*******************/
  render() {
    return (
       <div className="pin">
          <img src={this.props.img_url} className="pin-img"></img>
          <div className="description">{this.props.description}</div>
          <div className="delete" onClick={this.handleDeletePin}>Delete Pin</div>
      </div>
  );
  }
};

module.exports = UserPin;