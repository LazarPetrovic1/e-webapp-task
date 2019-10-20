import React, { useEffect, useState, Fragment } from "react";
import { Redirect, Link } from 'react-router-dom';
import { updatePost, getPost } from "../../actions/post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import Spinner from '../layout/Spinner';

function EditPost(props) {
  const {
    addPost,
    getPost,
    post: {post, loading, posts},
    history,
    match
  } = props;

  const [thisPost, setPost] = useState({
    postname: "",
    about: "",
    attendees: []
  });

  useEffect(() => {
    getPost(match.params.id);

    setPost({
      postname: loading || !post.postname ? "" : post.postname,
      about: loading || !post.about ? "" : post.about,
      attendees: loading || !post.attendees ? "" : post.attendees,
    });
  }, [loading, getPost]);

  const {
    postname,
    about,
    attendees
  } = thisPost;

  const onChange = (e) => setPost({...thisPost, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    updatePost(thisPost, match.params.id);
    M.toast({html: "Post updated."});
    history.push("/posts");
  };

  return loading ? <Spinner /> : (
    <Fragment>
      <header className="post-form">
        <h1 className="center-align indigo-text darken-4">Retouch your venue</h1>
      </header>
      <form onSubmit={onSubmit} className="container">
        <div className="row">
          <div className="input-field col s12">
            <input
              name="postname"
              type="text"
              value={postname}
              style={{padding: "5px 10px"}}
              onChange={onChange}
              className="validate"
              required
            />
            <label htmlFor="postname">Name of the event</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              name="about"
              cols="30"
              style={{height: "10rem", marginTop: "1em", fontFamily: "inherit", padding: "5px 10px"}}
              onChange={onChange}
              value={about}
              required
            ></textarea>
            <label htmlFor="about">Describe the event</label>
          </div>
        </div>
        <button type="submit" className="btn waves-effect waves-light green darken-2 right white-text pulse">Update your event!</button>
      </form>
    </Fragment>
  );
}

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost, updatePost }
)(EditPost);
