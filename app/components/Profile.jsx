const React = require('react');
const Link = require('react-router-dom').Link
// style
const style = require('../styles/Profile');
// other components
const Header = require('./Header');
const UserPin = require('./UserPin');

/* the "Profile" component. Showsuser profile and allows user to add a card" */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        displayName: "",
        img_url: "",
        description: "",
        pins: <div className="loader"></div>,
        head_block: "",
        add_block: ""
    }
    this.handleAddPin = this.handleAddPin.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  /*******************/
  // Handlers
  /*******************/
  handleAddPin() {
    let that = this;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/add-pin', true);
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
  /**************************/
   handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if((name == "description") && (value.length > 8)) {
      return;
    }
     else {
      this.setState({
        [name]: value
        });
     }
  } 
  /*******************/
  handleShowModal() {
    // Get the modal
     const modal = document.getElementById('myModal');
     modal.style.display = "block";
    // Get the <span> element that closes the modal
     const span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
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
      let pins = "";
      if(response.pins !== undefined) {
        pins = response.pins.map((e) => {
          return <UserPin img_url={e.img_url} description={e.description} key={e.img_url+e.description}/>;
        });
      }                          
      that.setState({
        ["displayName"]: response.displayName,
        ["pins"]: pins,
        ["head_block"]: <h1 id="profile-h">Hello, {response.displayName}</h1>,
        ["add_block"]:  <div id="pin-add">
                    <div id="add-btn" onClick={that.handleShowModal}>Add new pin</div>
                  </div>
         });
    }
  }
  /*******************/
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          {this.state.head_block}
          <div className="pins">
            {this.state.add_block}
            {this.state.pins}
          </div>
        </div>
        {/* modal for adding new pin */}
        <div id="myModal" className="modal">

          <div className="modal-content">
            <div className="modal-header">
              <span className="close">&times;</span>
              <h2 id="h-modal">New Pin</h2>
            </div>
            <div className="modal-body">
              <div className="label">Img url:</div>
              <input type="text" className="input" onChange={this.handleInputChange} name="img_url" required></input>
              <div className="label">Description:</div>
              <input type="text" placeholder="max 9 characters" className="input" name="description" onChange={this.handleInputChange} value={this.state.description} required></input>
            </div>
            <div className="modal-footer">
              <div id="add-new-pin" onClick={this.handleAddPin}>add</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

module.exports = Profile;