const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/UserPin');

/* the AnotherUserPin component (contains: pin card). Shows pin card in another user profile*/
class AnotherUserPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: this.props.img_url,
      description: this.props.description
    };
  }
  /*******************/
  render() {
    return (
       <div className="pin">
          <img src={this.props.img_url} className="pin-img"></img>
          <div className="description-pin">{this.props.description}</div>
      </div>
  );
  }
};

module.exports = AnotherUserPin;