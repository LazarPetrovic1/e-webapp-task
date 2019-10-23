import React, { useEffect, useState, Fragment, useCallback, useMemo } from "react";
import { Link, withRouter } from 'react-router-dom';
import { updatePost, getPost } from "../../actions/post";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import Spinner from '../layout/Spinner';
import ErrorBoundary from '../ErrorBoundary';

function EditPost(props) {
  const {
    getPost,
    updatePost,
    post: {post, loading, posts},
    history,
    match
  } = props;

  const [form, setForm] = useState({
    postname: "",
    about: "",
    attendees: [],
    date: "",
    time: "",
    capacity: ""
  });


  const postGetter = useCallback(() => getPost(match.params.id), [getPost, match.params.id]);
  useMemo(() => {
    postGetter();
    setForm({
      postname: loading || !post ? "" : post.postname,
      about: loading || !post ? "" : post.about,
      attendees: loading || !post ? "" : post.attendees,
      date: loading || !post ? "" : post.date,
      time: loading || !post ? "" : post.time,
      capacity: loading || !post ? "" : post.capacity
    });
  }, [postGetter]);

  useEffect(() => {
      setForm({
        postname: loading || !post ? "" : post.postname,
        about: loading || !post ? "" : post.about,
        attendees: loading || !post ? "" : post.attendees,
        date: loading || !post ? "" : post.date,
        time: loading || !post ? "" : post.time,
        capacity: loading || !post ? "" : post.capacity
    });
    // console.log("POST", post);
    // console.log("FORM", form);
  }, [post]);

  const {
    postname,
    about,
    attendees,
    date,
    time,
    capacity
  } = form;

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    updatePost(form, match.params.id);
    // console.log("EDIT - THIS POST", form);
    M.toast({html: "Post updated."});
    history.push("/posts");
  };

  // console.log(form);

  return !post || loading ? <Spinner /> : (
    <Fragment>
      <header className="post-form">
        <h1 className="center-align indigo-text darken-4">Retouch your venue</h1>
      </header>
      <ErrorBoundary>
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="postname"
                  type="text"
                  value={postname}
                  placeholder="Title"
                  style={{padding: "5px 10px"}}
                  onChange={onChange}
                  className="validate"
                  required
                  />
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
                  placeholder="Description"
                  required
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="date"
                  type="date"
                  value={date}
                  placeholder="Date"
                  style={{padding: "5px 10px"}}
                  onChange={onChange}
                  className="validate"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="time"
                  type="time"
                  value={time}
                  placeholder="Time"
                  style={{padding: "5px 10px"}}
                  onChange={onChange}
                  className="validate"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="capacity"
                  type="number"
                  value={capacity}
                  placeholder="Capacity"
                  style={{padding: "5px 10px"}}
                  onChange={onChange}
                  className="validate"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn waves-effect waves-light green darken-2 right white-text pulse">Update your event!</button>
          </form>
          <Link to="/posts" className="btn waves-effect waves-light green darken-2 white-text">Go back</Link>
        </div>
      </ErrorBoundary>
    </Fragment>
  )
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
)(withRouter(EditPost));
