import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import { ADMIN_OBSERVATIONS_LIST_PAGE_PATH } from '../../Reporting_Portal/Admin/constants/routeConstants/RouteConstants.js';
import AdminObservationsListRoute from '../../Reporting_Portal/Admin/routes/AdminObservationsListRoute/AdminObservationsListRoute.js';
import ProtectedRoute from './ProtectedRoute.js';

describe("testing for protected route", async() => {
    it("should test the route", () => {
        const { getByRole } = render(<ProtectedRoute path={ADMIN_OBSERVATIONS_LIST_PAGE_PATH } component={AdminObservationsListRoute}/>);
    });

});
