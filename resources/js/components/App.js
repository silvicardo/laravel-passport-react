/**********************/
/* APP WITHOUT REDUX */
/**********************/

//React, React-> Component, ReactDOM
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
//React Router DOM
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Navbar from './Navbar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

/**********************/
/* MAIN APP COMPONENT */
/**********************/

export default class App extends Component {

  constructor(props){
    super(props);

    //This is the Highest level state

    this.state = {
      isLoggedIn: false,
      currentUser: {},
      token: null,
    }

    this.registrationSubmit = this.registrationSubmit.bind(this);
  }

  //callbacks will be used in the descendant component
  registrationSubmit(data, successCallback, errorCallback){

    axios.post('/api/register', {...data})
    .then(({data}) => {

      successCallback();
      //data contains currentUser and token
      this.setState({ isLoggedIn: true, ...data})

    })
    .catch((error) => {
      console.log(error.response.data);
      errorCallback(error.response.data.errors);

    })

  }

  render(){

    return(
      <Fragment>
        <Navbar isLoggedIn={this.state.isLoggedIn}/>
        <div className="container py-5">
        <Switch>
          <Route exact path="/" render={(props) =><HomePage {...this.state}/ >}/>
          <Route exact path="/login" render={(props) => (<LoginPage {...props}/>)}/>
          <Route exact path="/register" render={(props) => (<RegisterPage onRegister={this.registrationSubmit} {...props}/>)}/>
        </Switch>
        </div>
      </Fragment>
    )
  }

}

/**********************/
/* REACT-DOM -> RENDER */
/**********************/

if (document.getElementById('app')) {
    ReactDOM.render(
      <Router>
          <App />
      </Router>
      , document.getElementById('app'));
}
