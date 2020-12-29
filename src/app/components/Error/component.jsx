import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <p style={{ color: 'red' }}>
        {error}
      </p>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
