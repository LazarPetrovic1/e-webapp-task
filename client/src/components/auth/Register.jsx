import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import Spinner from '../layout/Spinner';

function Register(props) {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
    seepass1: false,
    seepass2: false
  });

  const { setAlert, register, isAuthenticated, loading } = props;
  const { fname, lname, email, password, password2, seepass1, seepass2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    let name = `${fname} ${lname}`;
    if (password !== password2) {
      setAlert("Passwords do not match.", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return loading ? <Spinner /> : (
    <Fragment>
      <h1 className="center-align">Get started for absolutely free.</h1>
      <p className="center-align">Enter your details below.</p>
      <form onSubmit={onSubmit} className="container">
        <div className="row">
          <div className="input-field col s12">
            <input value={fname} onChange={onChange} name="fname" type="text" className="validate" />
            <label htmlFor="first_name">First Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input name="lname" type="text" value={lname} onChange={onChange} className="validate" />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input name="email" type="email" value={email} onChange={onChange} className="validate" />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input value={password} onChange={onChange} name="password" type={seepass1 ? "text" : "password"} className="validate col s11" />
            <i className="material-icons col s1" onClick={() => setFormData({...formData, seepass1: !seepass1})}>{seepass1? "visibility" : "visibility_off"}</i>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input name="password2" type={seepass2 ? "text" : "password"} value={password2} onChange={onChange} className="validate col s11" />
            <i className="material-icons col s1" onClick={() => setFormData({...formData, seepass2: !seepass2})}>{seepass2? "visibility" : "visibility_off"}</i>
            <label htmlFor="password2">Validate password</label>
          </div>
        </div>
        <p className="center-align">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        <button type="submit" className="btn waves-effect waves-light green darken-2 right white-text pulse" style={{marginBottom: "3rem"}}>Register</button>
      </form>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
