/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import RpService from "../../services/RpService/index.fixtures.js";
import RpStore from "../../stores/RpStore/index.js";
import { AuthFixtureService } from '../../../Authentication/services/AuthService/index.fixtures.js';
import AuthStore from '../../../Authentication/stores/AuthStore/index.js';
import { RP_OBSERVATIONS_LIST_PAGE_PATH } from '../../constants/routeConstants/RouteConstants.js';
import { USER_OBSERVATION_LIST_PATH } from '../../../User/constants/routeConstants/RouteConstants.js';

import RpAssignedObservationsListPageRoute from './RpAssignedObservationsListPageRoute.js';

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("testing for rp assigned observation list page route", () => {

    let rpService;
    let rpStore;
    let authStore;
    let authService;
    beforeEach(() => {
        rpService = new RpService();
        rpStore = new RpStore(rpService);
        authService = new AuthFixtureService();
        authStore = new AuthStore(authService);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should test onclick observation cell", async() => {

        const history = createMemoryHistory();
        const route = RP_OBSERVATIONS_LIST_PAGE_PATH;
        history.push(route);

        const { getAllByTestId, getByTestId } = render(
            <Provider rpStore={rpStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={RP_OBSERVATIONS_LIST_PAGE_PATH }>
                        <RpAssignedObservationsListPageRoute />
                    </Route>
                    <Route path={USER_OBSERVATION_LIST_PATH}>
                        <LocationDisplay />
                    </Route>
                </Router>
            </Provider>
        );
        const observationCell = await (waitFor(() => getAllByTestId("observation-cell")));
        fireEvent.click(observationCell[0]);
        waitFor(() => {
            expect(
                getAllByTestId("observation-cell")
            ).not.toBeInTheDocument();
            expect(getByTestId("location-display")).toHaveTextContent(
                USER_OBSERVATION_LIST_PATH
            );
        });
    });

});
