/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import { LOG_IN_PATH } from '../../constants/routeConstants/RouteConstants.js';
import { USER_OBSERVATION_LIST_PATH } from '../../../User/constants/routeConstants/RouteConstants.js';

import AuthService from "../../services/AuthService/index.api.js";
import AuthStore from "../../stores/AuthStore/index.js";
import getUserLogInResponse from "../../fixtures/getUserLogInResponse.json";

import LogInRoute from "./LogInRoute.js";

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("log in route tests", () => {
    let authAPI;
    let authStore;

    beforeEach(() => {
        authAPI = new AuthService();
        authStore = new AuthStore(authAPI);
        authStore.userLogOut();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render username error message', async() => {

        const { getByText, getByRole } = render(
            <Router history={createMemoryHistory()}>
                <LogInRoute authStore={authStore}/>
            </Router>
        );

        const loginButton = getByRole('button', { name: 'LOGIN' });
        fireEvent.click(loginButton);

        getByText('Please enter username');

    });

    it('should render password error message', () => {

        const { getByText, getByRole, getByTestId } = render(
            <Provider authStore={authStore}>
                <Router history={createMemoryHistory()}>
                    <LogInRoute/>
                </Router>
            </Provider>
        );
        const username = 'user-text';

        const userNameField = getByTestId('USERNAME');
        const signinButton = getByRole('button', { name: 'LOGIN' });

        fireEvent.change(userNameField, { target: { value: username } });
        fireEvent.click(signinButton);

        getByText('Please enter password');

    });

    it("should render signInRoute success state", async() => {
        const history = createMemoryHistory();
        const route = LOG_IN_PATH;
        history.push(route);

        const {
            getByRole,
            queryByRole,
            getByTestId
        } = render(
            <Provider authStore={authStore}>
                <Router history={history}>
                    <Route path={LOG_IN_PATH}>
                        <LogInRoute />
                    </Route>
                    <Route path={USER_OBSERVATION_LIST_PATH}>
                        <LocationDisplay />
                    </Route>
                </Router>
            </Provider>
        );

        const username = "test-user";
        const password = "test-password";

        const usernameField = getByTestId('USERNAME');
        const passwordField = getByTestId('PASSWORD');
        const logInButton = getByRole("button", { name: "LOGIN" });

        const mockSuccessPromise = new Promise(function(resolve, reject) {
            resolve(getUserLogInResponse);
        });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        authAPI.logInAPI = mockLogInAPI;

        fireEvent.change(usernameField, { target: { value: username } });
        fireEvent.change(passwordField, { target: { value: password } });
        fireEvent.click(logInButton);

        waitFor(() => {
            expect(
                queryByRole("button", { name: "LOGIN" })
            ).not.toBeInTheDocument();
            expect(getByTestId("location-display")).toHaveTextContent(
                USER_OBSERVATION_LIST_PATH
            );
        });
    });

    it("should render signInRoute failure state", () => {

        const { getByText, getByRole, getByTestId } = render(
            <Router history={createMemoryHistory()}>
                <LogInRoute authStore={authStore} />
        </Router>
        );

        const username = "test-user";
        const password = "test-password";

        const usernameField = getByTestId('USERNAME');
        const passwordField = getByTestId('PASSWORD');
        const signInButton = getByRole("button", { name: "LOGIN" });

        const mockFailurePromise = new Promise(function(resolve, reject) {
            reject(new Error("{ data: { response: InvalidUsername } }"));
        });

        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        authAPI.logInAPI = mockLogInAPI;

        fireEvent.change(usernameField, { target: { value: username } });
        fireEvent.change(passwordField, { target: { value: password } });
        fireEvent.click(signInButton);

        // waitFor(getByText('invalid username'));
        // expect(authStore.getUserLogInAPIStatus).toBe(API_FAILED);

    });
});
