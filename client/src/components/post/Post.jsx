import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { attend, unattend, deletePost } from "../../actions/post";
import M from "materialize-css/dist/js/materialize.min.js";

function Post(props) {
  const {
    auth,
    attend,
    unattend,
    deletePost,
    post: {_id, postname, about, name, user, attendees, date}
  } = props;

  const checkUsers = (attendArr, targetUser) => {
    for (const attendee of attendArr) {
      if (targetUser === attendee) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="card">
      {
        auth.user._id === user && (
          <span style={{padding: "1rem", cursor: "pointer"}} className="right" onClick={() => {deletePost(_id); M.toast({html: "The event has been taken down."})}}>
            <i className="material-icons right red-text darken-4">delete</i>
          </span>
        )
      }
      <p style={{padding: "1rem"}} className="grey-text lighten-2">
        <Moment format="LL">{date}</Moment>
      </p>
      <h3 className="center-align">{postname}</h3>
      <p className="grey-text lighten-2 center-align" style={{fontSize: "1.3rem"}}>{auth.user.name}</p>
      <p className="center-align">{about}</p>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <p className="grey-text lighten-2" style={{margin: "1rem"}}>
          <i className="material-icons">person_add</i> {attendees.length} of 31 {/*ADD_CAP_LATER*/}
        </p>
        {
          auth.user._id === user ? (
            <Link to={`/edit-post/${_id}`} className="grey lighten-2 grey-text " style={{margin: "1rem", padding: "0 2rem", outline: "none", border: "none", letterSpacing: "1px", fontWeight: "bold"}}>EDIT</Link>
          ) : checkUsers(attendees, auth.user._id) ? (
            <button className="red darken-4" style={{margin: "1rem", padding: "0 2rem", outline: "none", border: "none", letterSpacing: "1px", fontWeight: "bold"}} onClick={() => unattend(_id)}>LEAVE</button>
          ) : (
            <button className="green darken-4" style={{margin: "1rem", padding: "0 2rem", outline: "none", border: "none", letterSpacing: "1px", fontWeight: "bold"}} onClick={() => attend(_id)}>JOIN</button>
          )
        }
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  attend: PropTypes.func.isRequired,
  unattend: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  attend,
  unattend,
  deletePost
})(Post);
