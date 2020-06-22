import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../../../utils/StorageUtils';
import { LOG_IN_PATH } from '../../../Reporting_Portal/Authentication/constants/routeConstants/RouteConstants.js';

class ProtectedRoute extends React.Component {

    render() {
        const { path, component: Component } = this.props;
        if (getAccessToken()) {
            return <Route path={path} component={Component}/>;
        }
        else {
            return <Redirect to={{pathname:LOG_IN_PATH}}/>;
        }
    }
}

export { ProtectedRoute };
