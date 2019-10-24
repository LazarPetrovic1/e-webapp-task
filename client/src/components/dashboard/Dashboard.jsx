import React, {Fragment, useEffect} from 'react';
import Post from '../post/Post';
import {getPosts} from '../../actions/post';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

function Dashboard(props) {
  const {post: {posts, loading}, getPosts, auth} = props;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading || !props.post ? <Spinner /> : (
    <Fragment>
      <h1 className="center-align indigo-text darken-4">Welcome, {auth.user.name}</h1>
      <p className="center-align" style={{fontSize: "2.2em"}}>Take a look at your upcoming events</p>
      <section className="container">
        {posts.map(
          post => <Post post={post} key={post._id} auth={auth} />
      )}
    </section>
    </Fragment>
  )
}

Dashboard.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, {getPosts})(Dashboard);
