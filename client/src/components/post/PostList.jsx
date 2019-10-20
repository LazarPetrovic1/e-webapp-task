import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import Post from "./Post";
import {Link} from 'react-router-dom';

function PostList(props) {
  const {getPosts, post} = props;
  const {posts, loading} = post;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="indigo-text center-align darken-4">Posts</h1>
      <section className="container">
        {posts.length > 0 ? posts.map(post => (
          <Post key={post._id} post={post} />
        )) : (
          <Fragment>
            <h2 className="center-align">Sorry, no posts to show</h2>
          </Fragment>
        )}
      </section>
      <Link to="/create-post" className="btn waves-effect waves-light green darken-2 right white-text" style={{margin: "2rem"}}>
        Create an event!
      </Link>
    </Fragment>
  );
}

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PostList);
