import React from 'react';
import { Route } from 'react-router-dom';
import LogIn from './LogInRoute.js';
import { LOG_IN_PATH } from '../../constants/routeConstants/RouteConstants.js';
export const LogInRoute = <Route path={LOG_IN_PATH} component={LogIn}/>;
