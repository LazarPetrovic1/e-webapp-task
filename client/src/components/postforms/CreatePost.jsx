import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/post";
import {Redirect} from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";

function CreatePost(props) {
  const [post, setPost] = useState({
    postname: "",
    about: "",
    attendees: [],
    date: "",
    time: "",
    capacity: ""
  });

  const {addPost, history} = props;
  const {postname, about, attendees, date, time, capacity} = post;

  const onChange = (e) => setPost({...post, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    const formData = {postname, about, date, time, capacity, attendees};
    addPost(formData);
    setPost({
      postname: "",
      about: "",
      attendees: [],
      date: "",
      time: "",
      capacity: ""
    });
    M.toast({html: "Event added."});
    return history.push("/posts");
  }

  return (
    <Fragment>
      <header className="post-form">
        <h3 className="center-align" style={{color: "navy", fontWeight: "bolder"}}>Create a post.</h3>
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
          <label htmlFor="postname" style={{padding: "5px 10px"}}>Title</label>
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
            />
          <label htmlFor="about" style={{padding: "5px 10px"}}>Description</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="date"
              type="date"
              style={{padding: "5px 10px"}}
              onChange={onChange}
              value={date}
              className="validate"
              required
            />
          <label htmlFor="about">Date</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="time"
              type="time"
              style={{padding: "5px 10px"}}
              onChange={onChange}
              value={time}
              className="validate"
              required
            />
          <label htmlFor="about">Time</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="capacity"
              type="number"
              style={{padding: "5px 10px"}}
              onChange={onChange}
              value={capacity}
              className="validate"
              required
            />
          <label htmlFor="about">Capacity</label>
          </div>
        </div>
        <button type="submit" className="btn waves-effect waves-light green darken-2 right white-text pulse">Make an event!</button>
      </form>
    </Fragment>
  );
}

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, {addPost})(CreatePost);
