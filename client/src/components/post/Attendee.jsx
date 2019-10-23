import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

function Attendee({attendee, auth}) {
  return (
    <div className="chip" style={{margin: "0.5em 0 1em 1.5em"}}>
      {auth.user._id === attendee.user ? "You" : attendee.name}
    </div>
  );
}

Attendee.propTypes = {
  attendee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Attendee);
