import React from 'react';
import { Route } from 'react-router-dom';
import AdminObservationsList from './AdminObservationsListRoute.js';
import { ADMIN_OBSERVATIONS_LIST_PAGE_PATH } from '../../constants/routeConstants/RouteConstants.js';
import { ProtectedRoute } from '../../../../common/components/ProtectedRoute';

export const AdminObservationsListRoute = <ProtectedRoute path={ADMIN_OBSERVATIONS_LIST_PAGE_PATH} component={AdminObservationsList}/>;
