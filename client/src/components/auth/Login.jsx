import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import Spinner from '../layout/Spinner';

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    seepass: false
  });

  const { email, password, seepass } = formData;
  const { login, isAuthenticated, loading } = props;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return loading ? <Spinner /> : (
    <Fragment>
      <h1 className="center-align">Sign in to Evetio.</h1>
      <p className="center-align">Enter your details below.</p>
      <form onSubmit={onSubmit} className="container">
        <div className="row">
          <div className="input-field col s12">
            <input name="email" type="email" value={email} onChange={onChange} className="validate" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={password} onChange={onChange} name="password" type={seepass ? "text" : "password"} className="validate col s11" />
            <i className="material-icons col s1" onClick={() => setFormData({...formData, seepass: !seepass})}>{seepass ? "visibility" : "visibility_off"}</i>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <p className="center-align">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        <button type="submit" className="btn waves-effect waves-light green darken-2 right white-text pulse">Login</button>
      </form>
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {login})(Login);
