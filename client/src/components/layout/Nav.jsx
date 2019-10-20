import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
import UserBadge from './UserBadge';
import M from "materialize-css/dist/js/materialize.min.js";


const Nav = (props) => {
  const {logout, auth: {isAuthenticated, loading, user}} = props;
  useEffect(() => {
    M.AutoInit()
    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {edge: "right"});
    // eslint-disable-next-line
  });

  return isAuthenticated && user && !loading ? (
    <Fragment>
      <nav>
        <div className="nav-wrapper white">
          <Link to="/" className="brand-logo left black-text" style={{paddingLeft: '1em'}}>E.</Link>
          <ul className="right" style={{paddingRight: '2em'}}>
            <li className="black-text">
              <a href="#" data-target="mobile-demo" className="sidenav-trigger" style={{display: "block"}}>
                <UserBadge  />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to="/create-post">
            Make your own event!
          </Link>
        </li>
        <li>
          <Link to="/about">
            About the app
          </Link>
        </li>
        <li>
          <Link to="/posts">
            Your events
          </Link>
        </li>
      </ul>
    </Fragment>
  ) : (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left black-text" style={{paddingLeft: '1em'}}>E.</Link>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
