import React, { Component, Fragment } from 'react';
import ErrorsAlert from './ErrorsAlert';

class LoginPage extends Component {

constructor(props){
  super(props);

  this.state = {
    email: '',
    password: '',
    errors: [],
  }

  //binding to preserve the context of this
  this.handleChange = this.handleChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.reachTheDashboard = this.reachTheDashboard.bind(this);
  this.manageLoginErrors = this.manageLoginErrors.bind(this);

}

handleChange(e) {

  this.setState({[e.target.name] : e.target.value });

}

reachTheDashboard(){

  this.props.history.push('/dashboard');
  
}

manageLoginErrors(error) {

  //display errors to the user
  this.setState({ errors: [error.error] });

}

onSubmit(e) {

  e.preventDefault();

  //login(success, fail)
  this.props.onLogin(this.state, this.reachTheDashboard, this.manageLoginErrors);

}

render() {

  //HANDLE INPUT ERRORS
  const {errors} = this.state;

  let userFeedback;

  if (errors.length !== 0) {

    userFeedback = (<ErrorsAlert {...this.state} />)

  }

  return (
          <Fragment>
            {userFeedback}

            <h1>Login Now!</h1>

            <form onSubmit={this.onSubmit} >
              <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input onChange={this.handleChange} type="email" name="email" value={this.state.email} className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input onChange={this.handleChange} type="password" name="password" value={this.state.password} className="form-control" id="password" placeholder="Password"/>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </Fragment>
        );

  }

}

export default LoginPage;
