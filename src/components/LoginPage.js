import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { Link } from 'react-router-dom';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">TJH Blog</h1>
      <p>A React based blog site.</p>
      <button className="button" onClick={startLogin} >Login with Google</button>
      <Link to="/"><p className="button">Back to blogs</p></Link>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
  });

export default connect(undefined, mapDispatchToProps)(LoginPage);