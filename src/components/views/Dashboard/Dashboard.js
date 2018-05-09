import React, {Component, Fragment} from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import {NavLink, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Loading from '../../Loading/Loading';
import NotLoggedIn from '../../NotLoggedIn/NotLoggedIn';
import {logoutUser} from '../../../redux/ducks/userReducer';
import logo from '../../../images/logo_final_white.svg';
import './Dashboard.css';
import {getResidentInfo} from '../../../redux/ducks/residentReducer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  onLogout() {
    console.log('logging out!');
    axios
      .get('/users/logout')
      .then((response) => {
        this.props.logoutUser();
        return this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }
  getCurrentUser() {
    axios.get('/users/current').then((response) => {
      this.currentUser = this.props.current_user;
    });
  }

  render() {
    const {current_user, loading} = this.props;
    const {path, params} = this.props.match;

    let dashboard = null;
    // don't exist
    if (!(Object.keys(current_user).length > 0) && !loading) {
      dashboard = <NotLoggedIn />;
    } else if (path.includes('/owner/') && !loading) {
      // if they're an owner
      dashboard = (
        <div className="Dashboard">
          <nav className="Dashboard__nav">
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Dashboard__link--back Link__none"
              to="/owner/properties"
            >
              <FontAwesome className="Dashboard__symbol--back" name="long-arrow-alt-left" />
              Back
            </NavLink>
            <NavLink
              exact
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to={`/owner/dashboard/property/${params.id}`}
            >
              Home
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to={`/owner/dashboard/property/${params.id}/units`}
            >
              Units
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to={`/owner/dashboard/property/${params.id}/residents`}
            >
              Residents
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to={`/owner/dashboard/property/${params.id}/metrics`}
            >
              Metrics
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to={`/owner/dashboard/property/${params.id}/maintenance`}
            >
              Maintenance
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to={`/owner/dashboard/property/${params.id}/settings`}
            >
              Settings
            </NavLink>
            <button className="Dashboard__link" onClick={() => this.onLogout()}>
              Logout
            </button>
            <img className="Dashboard__logo" src={logo} alt="logo" />
          </nav>
          <div className="Dashboard__body">{this.props.children}</div>
        </div>
      );
    } else if (path.includes('/owner/') && !loading) {
      // if they're a resident
      dashboard = (
        <div className="Dashboard">
          <nav className="Dashboard__nav">
            <NavLink
              exact
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to="/resident/dashboard/"
            >
              Contacts
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to="/resident/dashboard/billing/pay"
            >
              Pay Bills
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to="/resident/dashboard/billing/history"
            >
              Billing History
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to="/resident/dashboard/maintenance/create"
            >
              Maintenance Request
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to="/resident/dashboard/maintenance/history"
            >
              Maintenance History
            </NavLink>
            <NavLink
              activeClassName="Dashboard__link--active"
              className="Dashboard__link Link__none"
              to="/resident/dashboard/settings"
            >
              Settings
            </NavLink>
            <button className="Dashboard__link" onClick={() => this.onLogout()}>
              Logout
            </button>
            <img className="Dashboard__logo" src={logo} alt="logo" />
          </nav>
          <div className="Dashboard__body">{this.props.children}</div>
        </div>
      );
    } else {
      dashboard = <Loading />;
    }

    return <Fragment>{dashboard}</Fragment>;
  }
}

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default withRouter(connect(mapStateToProps, {logoutUser, getResidentInfo})(Dashboard));
