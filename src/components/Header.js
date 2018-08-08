import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, isAuthenticated }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>TJH Blog</h1>
        </Link>
        { isAuthenticated ? (
            <button className="button" onClick={startLogout}>Logout</button> 
          ) : (
            <Link to="/login" className="button">Login</Link>
          )
        }
      </div>
    </div>
  </header>
)
// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => ({
  isAuthenticated: Boolean(state.auth.uid)
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);

// <NavLink to="/help" activeClassName="is-active">Help</NavLink>



