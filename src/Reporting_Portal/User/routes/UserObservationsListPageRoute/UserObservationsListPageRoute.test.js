/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import { USER_OBSERVATION_LIST_PATH, USER_OBSERVATION_PAGE_PATH, USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants.js';
import UserService from "../../services/UserService/index.fixtures.js";
import UserStore from "../../stores/UserStore/index.js";
import AuthStore from '../../../Authentication/stores/AuthStore/index.js';
import { AuthFixtureService } from '../../../Authentication/services/AuthService/index.fixtures.js';

import UserObservationsListPageRoute from './UserObservationsListPageRoute.js';

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("user observations list testing", () => {

    let userService;
    let userStore;
    let authStore;
    let authService;
    beforeEach(() => {
        userService = new UserService();
        userStore = new UserStore(userService);
        authService = new AuthFixtureService();
        authStore = new AuthStore(authService);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should test on click reported on", async() => {
        const { getByTestId } = render(
            <Provider userStore={userStore} authStore={authStore}>
                <Router history={createMemoryHistory()}>
                    <UserObservationsListPageRoute />
                </Router>
            </Provider>
        );
        const reportedOnSortFilter = await (waitFor(() => getByTestId('REPORTED ON')));

        fireEvent.click(reportedOnSortFilter);

        // userStore.onClickUserObservationStoreReportedOn.toBeCalled(1);
    });

    it("should test on click due date", async() => {
        const { getByTestId } = render(
            <Provider userStore={userStore} authStore={authStore}>
                <Router history={createMemoryHistory()}>
                    <UserObservationsListPageRoute/>
                </Router>
            </Provider>
        );
        const dueDateSortFilter = await (waitFor(() => getByTestId('DUE DATE')));

        fireEvent.click(dueDateSortFilter);

        // userStore.onClickUserObservationStoreDueDate.toHaveBeenCalled(1);
    });

    // it("should test add new", async() => {

    //     const history = createMemoryHistory();
    //     const route = USER_OBSERVATION_LIST_PATH;
    //     history.push(route);

    //     const { getByRole, queryByRole, getByTestId } = render(
    //         <Provider userStore={userStore} authStore={authStore}>
    //             <Router history={history}>
    //                 <Route path={USER_OBSERVATION_LIST_PATH}>
    //                     <UserObservationsListPageRoute />
    //                 </Route>
    //                 <Route path={USER_REPORTING_PAGE_PATH}>
    //                     <LocationDisplay />
    //                 </Route>
    //             </Router>
    //         </Provider>
    //     );
    //     const addNewButton = await (waitFor(() => getByRole("button", { name: 'Add New' })));
    //     fireEvent.click(addNewButton);
    //     waitFor(() => {
    //         expect(
    //             queryByRole("button", { name: "Add New" })
    //         ).not.toBeInTheDocument();
    //         expect(getByTestId("location-display")).toHaveTextContent(
    //             USER_REPORTING_PAGE_PATH
    //         );
    //     });
    // });

    it("should test click on observation cell", async() => {

        const history = createMemoryHistory();
        const route = USER_OBSERVATION_LIST_PATH;
        history.push(route);

        const { getAllByTestId, getByTestId } = render(
            <Provider userStore={userStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={USER_OBSERVATION_LIST_PATH}>
                        <UserObservationsListPageRoute />
                    </Route>
                    <Route path={USER_OBSERVATION_PAGE_PATH}>
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
                USER_OBSERVATION_PAGE_PATH
            );
        });
    });

});
