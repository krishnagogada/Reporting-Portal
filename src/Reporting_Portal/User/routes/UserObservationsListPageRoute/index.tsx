import React from 'react';
import { Route } from 'react-router-dom';
import UserObservationsListPage from './UserObservationsListPageRoute.js';
import { USER_OBSERVATIONS_LIST_PATH } from '../../constants/routeConstants/RouteConstants.jsx';
import { ProtectedRoute } from '../../../../common/components/ProtectedRoute';

export const UserObservationsListPageRoute = <ProtectedRoute path={USER_OBSERVATIONS_LIST_PATH} component={UserObservationsListPage}/>;
