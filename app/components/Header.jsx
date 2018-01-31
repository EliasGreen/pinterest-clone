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
    
  }
  /*******************/
  handleExit() {
    
  }
  /*******************/
  // Prerender methods
  /*******************/
  componentWillMount() {
    
  }
  /*******************/
  render() {
    return (
       <div>
       {/* NAV BAR */}
            <nav className="nav-bar">
              <div className="all-pins-nav"> <Link to={"/allpins"} className="all-pins-nav-link"> All Pins </Link> </div>
            <div className="pipe">|</div>
            <div className="profile-nav"> <Link to={"/profile"} className="profile-nav-link"> Profile </Link> </div>
            <div className="sign-up-nav">Sign up</div>
            <div className="pipe">|</div>
          <div className="log-in-nav">Log in</div>
          <div className="exit-nav">Exit</div>
        </nav>
      </div>
  );
  }
};

module.exports = Header;