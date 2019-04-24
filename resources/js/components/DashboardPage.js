import React, { Fragment } from 'react';

const DashboardPage = (props) => (
      <Fragment>
        <div className="jumbotron">
          <h1>Welcome {props.user.name}</h1>
        </div>
        <p>Enjoy your stay</p>
        <button onClick={()=> {props.history.push('/')}}>Go Back to the Homepage </button>
      </Fragment>
    )

export default DashboardPage;
