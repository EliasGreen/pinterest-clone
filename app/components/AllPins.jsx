const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/AllPins');
// other components
const Header = require('./Header');
const Pin = require('./Pin');

/* the "AllPins" component. Shows all pins using "cards" */
class AllPins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pins: <div className="loader"></div>
    }
  }
  /*******************/
  // Prerender methods
  /*******************/
  componentWillMount() {
    //get all pins
    let that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/all-pins', true);

    xhr.send();

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
          return <Pin img_url={e.img_url} description={e.description} displayName={e.displayName} username={e.username} key={e.description+e.username+e.displayName}/>; 
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
            <div className="pins">
              {this.state.pins}
            </div>
          </div>
      </div>
    );
  }
};

module.exports = AllPins;