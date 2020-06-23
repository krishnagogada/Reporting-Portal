import React from 'react';
import { Route } from 'react-router-dom';
import LogIn from './LogInRoute';
// import UserObservationsListPageRoute from '../../../User/routes/UserObservationsListPageRoute/UserObservationsListPageRoute';
// import RpAssignedObservationsListPageRoute from '../../../RpReportingPortal/routes/RpAssignedObservationsListPageRoute/RpAssignedObservationsListPageRoute';
// import AdminObservationsListRoute from '../../../Admin/routes/AdminObservationsListRoute/AdminObservationsListRoute';
import { LOG_IN_PATH } from '../../constants/routeConstants/RouteConstants';
// import { ProtectedRoute } from '../../../../common/components/ProtectedRoute';
// import { getRoleType } from '../../../../utils/StorageUtils';

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
