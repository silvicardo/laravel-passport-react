import React, { Component, Fragment } from 'react';
//withRouter gives us the ability to navigate
//even if the component is not within a Route
import { NavLink, withRouter } from 'react-router-dom';

class Navbar extends Component {

  constructor(props){
    super(props);

    this.logoutBtnClicked = this.logoutBtnClicked.bind(this);
  }

  backToTheHomePage(){
    this.props.history.push('/');
  }

  logoutBtnClicked(){
    //Perform Logout and then reach the homeepage anyway (success, fail)
    this.props.logoutClicked(backToTheHomePage,backToTheHomePage);
  }

  render() {

    let authLinks;

    if (!this.props.isLoggedIn){
      authLinks = (
        <Fragment>
          <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
          <NavLink className="nav-item nav-link" to="/login">Login</NavLink>

        </Fragment>
      )
    } else {
      authLinks = (<button className="ml-5 btn btn-danger" onClick={this.logoutBtnClicked}>Logout</button>)
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">Laravel Passport + React</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            {authLinks}
          </div>
        </div>
      </nav>

    );
  }
}



export default withRouter(Navbar);
