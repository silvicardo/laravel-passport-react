import React, { Component, Fragment } from 'react';

class HomePage extends Component {


  render() {
    console.log('HomePage says', this.props);

    let userFeedback;

    if(this.props.isLoggedIn){
      userFeedback = (
        <div className="alert alert-success" role="alert">
            <h1>Welcome {this.props.currentUser.name}</h1>
            <p>You have a token to "track your session"</p>
        </div>
      )
    }
    return (
      <Fragment>
        <div>I'm the HomePage</div>
        {userFeedback}
      </Fragment>
    );
  }
}



export default HomePage;
