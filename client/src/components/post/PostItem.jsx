import React, { useEffect, useState, Fragment, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getPost, attend, unattend } from "../../actions/post";
import M from "materialize-css/dist/js/materialize.min.js";
import Spinner from '../layout/Spinner';
import Attendee from './Attendee';

function PostItem(props) {
  const {
    auth,
    getPost,
    match,
    attend,
    unattend,
    post: {post, loading}
  } = props;

  useEffect(() => {
    getPost(match.params.id);
    // console.log(props);
  }, [getPost]);

  const postGetter = useCallback(() => getPost(match.params.id), [getPost, match.params.id]);
  useMemo(() => {
    postGetter();
  }, [postGetter]);
  // console.log(post);

  const containsObject = (obj, list) => {
    for (const item of list) {
      if (item._id === obj.user) {
        return true;
      }
    }
    return false;
  }

  return loading || !post ? <Spinner /> : (
    <Fragment>
      <div className="container">
        <p className="grey-text lighten-2">Detail event:<br/> #{post._id}</p>
        <div className="card">
          <p style={{padding: "1rem"}} className="grey-text lighten-2">
            <Moment format="LL">{post.date}</Moment> - {post.time}
            </p>
            <h3 className="center-align">{post.postname}</h3>
            <p className="grey-text lighten-2 center-align" style={{fontSize: "1.3rem"}}>{post.name}</p>
            <p className="center-align">{post.about}</p>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <p className="grey-text lighten-2" style={{margin: "1rem"}}>
                <i className="material-icons">person_add</i> {post.attendees.length} of {post.capacity.toString()}
              </p>
              {
                auth.user._id === post.user && (
                  <Link to={`/edit-post/${post._id}`} className="grey lighten-2 grey-text " style={{margin: "1rem", padding: "0 2rem", outline: "none", border: "none", letterSpacing: "1px", fontWeight: "bold"}}>EDIT</Link>
                )
              }
              {
                auth.user._id !== post.user && post.attendees.find(el => JSON.stringify(el.user) === JSON.stringify(auth.user._id)) ? (
                  <button className="red darken-4" style={{margin: "1rem", padding: "0 2rem", outline: "none", border: "none", letterSpacing: "1px", fontWeight: "bold", color: "white"}} onClick={() => unattend(post._id)}>LEAVE</button>
                ) : (
                  <button className="green darken-4" style={{margin: "1rem", padding: "0 2rem", outline: "none", border: "none", letterSpacing: "1px", fontWeight: "bold", color: "white"}} onClick={() => attend(post._id)}>JOIN</button>
                )
              }
            </div>
          </div>
            <div className="card">
              <h4 style={{padding: "1em"}}>Attendees</h4>
              {
                post.attendees.length <= 0 ? (
                  <p className="grey-text lighten-1 center-align" style={{padding: "1em 0"}}>Unfortunately, nobody is attending your event.</p>
                ) : post.attendees.map(
                  (attendee, i) => <Attendee attendee={attendee} key={i} />
              )
            }
          </div>
          <Link to="/posts">Go back</Link>
      </div>
    </Fragment>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  attend: PropTypes.func.isRequired,
  unattend: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, {
  getPost,
  attend,
  unattend
})(PostItem);
