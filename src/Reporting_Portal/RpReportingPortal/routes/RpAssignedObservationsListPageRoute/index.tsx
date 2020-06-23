import React from 'react';
import { Route } from 'react-router-dom';
import RpAssignedObservationsListPage from './RpAssignedObservationsListPageRoute';
import { RP_OBSERVATIONS_LIST_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
import { ProtectedRoute } from '../../../../common/components/ProtectedRoute';

export const RpAssignedObservationsListPageRoute = <ProtectedRoute path={RP_OBSERVATIONS_LIST_PAGE_PATH} component={RpAssignedObservationsListPage}/>;
