import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Calendar from "../Calendar";
import HomeContent from '../HomeContent';
import NotFoundContent from '../NotFoundContent';

class Router extends Component {
  render() {
    // Properties
    const { user } = this.props;
    const {onWorkoutClick} = this.props
    // Functions
    const { openSnackbar } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <HomeContent
              user={user}
              setWorkouts={this.props.setWorkouts}
              openSnackbar={openSnackbar}
            />
          </Route>
          <Route path='/calendar/'>
            <Calendar onWorkoutClick={onWorkoutClick}/>
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default Router;
