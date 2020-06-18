import React from 'react';
import { Route } from 'react-router-dom';
import LogIn from './LogInRoute.js';
import UserObservationsListPageRoute from '../../../User/routes/UserObservationsListPageRoute/UserObservationsListPageRoute.js';
import RpAssignedObservationsListPageRoute from '../../../RpReportingPortal/routes/RpAssignedObservationsListPageRoute/RpAssignedObservationsListPageRoute.js';
import AdminObservationsListRoute from '../../../Admin/routes/AdminObservationsListRoute/AdminObservationsListRoute.js';
import { LOG_IN_PATH } from '../../constants/routeConstants/RouteConstants.js';
import { ProtectedRoute } from '../../../../common/components/ProtectedRoute';
import { getRoleType } from '../../utils/StorageUtils.js';

// let path;
// let component;
// switch (getRoleType()) {
//     case 'user':
//         path = "user-observations-list";
//         component = UserObservationsListPageRoute;
//         break;

//     case 'rp':
//         path = "rp-observations-list";
//         component = RpAssignedObservationsListPageRoute;
//         break;

//     case 'admin':
//         path = "admin-observations-list";
//         component = AdminObservationsListRoute;
//         break;
//     default:
//         path = "user-observations-list";
//         component = UserObservationsListPageRoute;
// }
export const LogInRoute = <Route path = { LOG_IN_PATH } component = { LogIn }/>;
// <ProtectedRoute path={path} component={component}/>
// <Route path = { LOG_IN_PATH } component = { LogIn }/>;
