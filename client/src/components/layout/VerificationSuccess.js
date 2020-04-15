import React, { Fragment } from 'react';

const VerificationSuccess = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Verification is Successful
      </h1>
      <p className='large'>Please login again.</p>
    </Fragment>
  );
};

export default VerificationSuccess;
