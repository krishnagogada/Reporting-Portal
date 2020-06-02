import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../../E_CommerceStore/Authentication/utils/StorageUtils.js';
import { SIGN_IN_PATH } from '../../E_CommerceStore/Authentication/constants/routeConstants/RouteConstants.js';
import { observer } from 'mobx-react'
class ProtectedRoute extends React.Component {

    render() {
        const { path, component: Component } = this.props;
        if (getAccessToken()) {
            return <Route path={path} component={Component}/>;
        }
        else {
            return <Redirect to={{pathname:SIGN_IN_PATH}}/>;
        }
    }
}

export { ProtectedRoute };
