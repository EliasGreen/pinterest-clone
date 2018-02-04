const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Pin');

/* the Pin component (contains: pin card). Shows pin card in ALL PINS page*/
class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.displayName,
      username: this.props.username,
      img_url: this.props.img_url,
      description: this.props.description
    };
  }
  /*******************/
  render() {
    return (
       <div className="pin">
          <div className="container-all-pins">
            <img src={this.props.img_url} alt="img is broken" className="image"/>
            <div className="middle">
              <div className="text"><Link to={'/user/'+this.props.displayName+"$"+this.props.username} className="anti-link">{this.state.displayName}</Link></div>
            </div>
          </div>
          <div className="description-pin">{this.props.description}</div>
       </div>
  );
  }
};

module.exports = Pin;