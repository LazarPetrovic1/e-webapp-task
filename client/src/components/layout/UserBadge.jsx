import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function UserBadge(props) {
  const {auth} = props;
  const {isAuthenticated, user, loading} = auth;
  const initials = (user) => {
    let all = "";
    user.split(" ").map(word => all += word[0]);
    return all;
  };

  const badgeStyles = {
    borderRadius: "50%",
    border: "3px solid darkgray",
    color: "darkgray",
    padding: "1.2rem",
    lineHeight: "1rem",
    fontSize: "2rem",
    marginTop: "4px",
    display: "inline-block",
    userSelect: "none",
    backgroundColor: "lightgray"
  };

  return isAuthenticated && user && !loading && (
    <Fragment>
      <div style={badgeStyles}>
        {initials(user.name)}
      </div>
      <i className="material-icons grey-text darken-3" style={{display: "inline"}}>keyboard_arrow_right</i>
    </Fragment>
  );
}

UserBadge.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserBadge);
