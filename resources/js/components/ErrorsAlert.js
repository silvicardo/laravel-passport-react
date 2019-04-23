import React from 'react';

const ErrorsAlert = ({errors}) => (
  <div className="alert alert-warning" role="alert">
    <ul className="list-unstyled">
      {errors.map((err, index) => (<li key={index}>{err}</li>))}
    </ul>
  </div>
);

export default ErrorsAlert;
