import React from 'react';
import PropTypes from 'prop-types';

const overlaySpinnerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 999,
  backgroundColor: '#000000',
  opacity: 0.6,
};

export default function OverlaySpinner(props) {
  const { show } = props;

  if (!show) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center" style={overlaySpinnerStyle}>
      <div className="spinner-border align-self-center" role="status" style={{ color: '#c71414' }}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

OverlaySpinner.propTypes = {
  show: PropTypes.bool.isRequired,
};
