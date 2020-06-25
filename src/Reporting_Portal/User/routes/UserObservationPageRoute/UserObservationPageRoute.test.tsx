/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor, getByText } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import UserService from "../../services/UserService/index.fixtures";
import UserStore from "../../stores/UserStore/index";
import AuthStore from '../../../Authentication/stores/AuthStore/index';
import { AuthFixtureService } from '../../../Authentication/services/AuthService/index.fixtures';
import userSingleObservation from "../../fixtures/userObservationsList.json";
import { USER_OBSERVATIONS_LIST_PATH, USER_OBSERVATION_PAGE_PATH, USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';

import UserObservationPageRoute from './UserObservationPageRoute';

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("testing for user observation page", () => {

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

    it("should test go back", async() => {
        const history = createMemoryHistory();
        const route = USER_OBSERVATIONS_LIST_PATH;
        const secondRoute = USER_OBSERVATION_PAGE_PATH;
        history.push(route);
        history.push(secondRoute);

        const { getByTestId } = render(
            <Provider userStore={userStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={USER_OBSERVATION_PAGE_PATH}>
                        <UserObservationPageRoute />
                    </Route>
                    <Route path={USER_OBSERVATIONS_LIST_PATH}>
                        <LocationDisplay />
                    </Route>
                </Router>
            </Provider>
        );
        const goBackButton = await waitFor(() => getByTestId('back-button'));
        fireEvent.click(goBackButton);
        // expect(getByTestId("location-display")).toHaveTextContent(USER_OBSERVATIONS_LIST_PATH);
    });
    it("should test public and private radio type for Rp",async()=>{

        const history = createMemoryHistory();
        const route = USER_OBSERVATION_PAGE_PATH;
        history.push(route);

        authStore.setUserLogInAPIResponse({type:'RP'});
        const { getByText } = render(
        <Provider userStore={userStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={USER_OBSERVATION_PAGE_PATH}>
                        <UserObservationPageRoute />
                    </Route>
                </Router>
            </Provider>
        )
        await waitFor(()=>getByText('PUBLIC'))
    })
});
