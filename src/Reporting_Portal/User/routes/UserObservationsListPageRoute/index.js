import React from 'react';
import { Route } from 'react-router-dom';
import UserObservationsListPage from './UserObservationsListPageRoute.js';
import { USER_OBSERVATION_LIST_PATH } from '../../constants/routeConstants/RouteConstants.js';
import { ProtectedRoute } from '../../../../common/components/ProtectedRoute';

export const UserObservationsListPageRoute = <ProtectedRoute path={USER_OBSERVATION_LIST_PATH} component={UserObservationsListPage}/>;
