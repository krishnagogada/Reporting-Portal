import React from 'react';
import { Route } from 'react-router-dom';
import UserReportingPage from './UserReportingPageRoute';
import { USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
export const UserReportingPageRoute = <Route path={USER_REPORTING_PAGE_PATH} component={UserReportingPage}/>;
