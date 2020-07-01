import React from 'react';
import { Route } from 'react-router-dom';
import UserObservationPage from './UserObservationPageRoute'
import { USER_OBSERVATION_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
export const UserObservationPageRoute = <Route path={USER_OBSERVATION_PAGE_PATH} component={UserObservationPage}/>;
