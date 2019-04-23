import React, { Component, Fragment } from 'react';
import axios from 'axios';

class RegisterPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({[e.target.name] : e.target.value });
  }

  onSubmit(e) {

    e.preventDefault();

    this.props.onRegister(this.state,
    () => {//SUCCESS CALLBACK
      //back to homePage
      this.props.history.push('/');
    },
    (errors) => {//FAIL
      //display errors to the user
      console.log(errors);
      this.setState({ errors })
    }

   )

  }


  render() {

    //HANDLE INPUT ERRORS
    const {errors} = this.state;

    let userFeedback;

    if (errors.length !== 0) {

      userFeedback = (
        <div className="alert alert-warning" role="alert">
          <ul className="list-unstyled">
            {errors.map((err, index) => (<li key={index}>{err}</li>))}
          </ul>
        </div>
      )
    }

    return (

      <Fragment>
      {userFeedback}

      <h1>Register now!</h1>



      <form
       onSubmit={this.onSubmit}
      >
        <div className="form-group">
          <label htmlFor="nameInput">Your name</label>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name} className="form-control" id="nameInput" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input onChange={this.handleChange} type="email" name="email" value={this.state.email} className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={this.handleChange} type="password" name="password" value={this.state.password} className="form-control" id="password" placeholder="Password"/>
        </div>
        <div className="form-group">
          <label htmlFor="password-confirmation">Password</label>
          <input onChange={this.handleChange} type="password" name="password_confirmation" value={this.state.password_confirmation} className="form-control" id="password-confirmation" placeholder="Check Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>

    </Fragment>
    );
  }
}



export default RegisterPage;
