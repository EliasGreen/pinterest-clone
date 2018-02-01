const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Header');

/* the header component (contains: navbar). Shows nav bar and modals: "sign-up" and "log-in"*/
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      email: "",
      password: "",
      isLogedIn: false
    };
    
    this.handleChangeInput = this.handleChangeInput.bind(this);
    
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }
  /*******************/
  // Handlers
  /*******************/
  handleChangeInput() {
    
  }
  /*******************/
  handleSignUp() {
    
  }
  /*******************/
  handleLogIn() {
    window.location.href = "/auth/twitter";
  }
  /*******************/
  handleExit() {
    let that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/logout', true);

    xhr.send();

    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      if (this.status != 200) {
        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
        return;
      }
      let response = JSON.parse(this.responseText);
      if(response.error == 0) {
        that.setState({
          ["isLogedIn"]: false
           });
      }
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
      
      if(response.isLogedIn === true) {
        that.setState({
          ["isLogedIn"]: true
           });
      }
      
      else {
        that.setState({
          ["isLogedIn"]: false
           });
      }
    }
  }
  /*******************/
  render() {
    let buttonLogInOrExit = "";
    if(this.state.isLogedIn === true) {
      buttonLogInOrExit = <div className="exit-nav" onClick={this.handleExit}>Exit</div>;
    }
    else {
      buttonLogInOrExit = <div className="log-in-nav" onClick={this.handleLogIn}>Log in</div>;
    }
    return (
       <div>
       {/* NAV BAR */}
        <nav className="nav-bar">
            <div className="all-pins-nav"> <Link to={"/allpins"} className="all-pins-nav-link"> All Pins </Link> </div>
            <div className="pipe">|</div>
            <div className="profile-nav"> <Link to={"/profile"} className="profile-nav-link"> Profile </Link> </div>
            {buttonLogInOrExit}
        </nav>
      </div>
  );
  }
};

module.exports = Header;