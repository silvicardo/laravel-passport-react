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
import DashboardPage from './DashboardPage';
import ErrorsAlert from './ErrorsAlert';

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
      errors:[] //logout errors
    }

    this.registrationSubmit = this.registrationSubmit.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
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

  logoutClicked(successCallback, errorCallback){

    axios(
     {
       url: '/api/logout',
       method: 'get',
       headers: {
         'X-Requested-With': 'XMLHttpRequest',
         'Authorization' : 'Bearer ' + this.state.token},
       responseType: 'json',
     }
   )
    .then(({data}) => {

      successCallback();

      this.setState({
        isLoggedIn: false,
        currentUser: {},
        token: null,
      })

    })
    .catch((error) => {
      errorCallback();
      console.log(error.response.data);
      this.setState({
        errors: [error.response.data.message]
      });
    })

  }

  loginClicked(formData,successCallback, errorCallback){

    const reqData = {'password' : formData.password, 'email' : formData.email };

    const axiosData = Object.keys(reqData).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
    }).join('&')

    console.log('axios data', axiosData);

    axios(
     {
       url: '/api/login',
       method: 'post',
       headers: {
         'X-Requested-With': 'XMLHttpRequest',
         'Authorization' : 'Bearer ' + this.state.token
       },
       data: axiosData,
       responseType: 'json',
     }
   )
    .then(({data}) => {
      console.log(data)
      successCallback();

      this.setState({ isLoggedIn: true, ...data})

    })
    .catch((error = {error: "Unprocessable entity"}) => {

      errorCallback(error.response.data);

    })

  }

  render(){

    console.log('HigherState says', this.state);

    //HANDLE INPUT ERRORS

    let userFeedback;

    if (this.state.errors.length !== 0) {

      userFeedback = (<ErrorsAlert {...this.state} />)
    }

    return(
      <Fragment>
        <Navbar isLoggedIn={this.state.isLoggedIn} logoutClicked={this.logoutClicked}/>
        <div className="container py-5">
          {userFeedback}
        <Switch>
          <Route exact path="/" render={(props) =><HomePage {...this.state}/ >}/>
          <Route exact path="/login" render={(props) => (<LoginPage onLogin={this.loginClicked} {...props} {...this.state}/>)}/>
          <Route exact path="/register" render={(props) => (<RegisterPage onRegister={this.registrationSubmit} {...props}/>)}/>
          <Route exact path="/dashboard" render={(props) => (<DashboardPage {...props} user={this.state.currentUser} />)}/>
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
