import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getPost, attend, unattend } from "../../actions/post";
import Spinner from '../layout/Spinner';

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
    // eslint-disable-next-line
  }, [getPost, match.params.id]);

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
