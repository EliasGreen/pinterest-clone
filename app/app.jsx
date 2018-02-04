const React = require('react');
const { render } = require('react-dom');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

// redux
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./reducers');

let store = createStore(reducers);

/* Import Components */
const Main = require('./components/Main');
const AllPins = require('./components/AllPins');
const Profile = require('./components/Profile');
const AnotherUserProfile = require('./components/AnotherUserProfile');

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Main}/>
        <Route exact path="/allpins" component={AllPins}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/user/:user" component={AnotherUserProfile}/>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));