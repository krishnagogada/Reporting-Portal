/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import { USER_OBSERVATION_LIST_PATH } from '../../constants/routeConstants/RouteConstants.js';
import { USER_REPORTING_PAGE_PATH } from '../../constants/routeConstants/RouteConstants.js';
import UserService from "../../services/UserService/index.fixtures.js";
import UserStore from "../../stores/UserStore/index.js";
import AuthStore from '../../../Authentication/stores/AuthStore/index.js';
import { AuthFixtureService } from '../../../Authentication/services/AuthService/index.fixtures.js';

import UserReportingPageRoute from './UserReportingPageRoute.js';

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("testing user reporting page", () => {

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

    it("should test requried error message", async() => {

        const { getByRole, getByText } = render(
            <Provider userStore={userStore} authStore={authStore}>
                <Router history={createMemoryHistory()}>
                    <UserReportingPageRoute />
                </Router>
            </Provider>
        );
        const submitButton = await (waitFor(() => getByRole('button', { name: 'Submit' })));

        fireEvent.click(submitButton);
        getByText('invalid title');
        getByText('select severity');
        getByText('invalid description');

    });

    // it("should test succuss case", async() => {

    //     const { getByRole, getByText, getByTestId } = render(
    //         <Provider userStore={userStore} authStore={authStore}>
    //             <Router history={createMemoryHistory()}>
    //                 <UserReportingPageRoute />
    //             </Router>
    //         </Provider>
    //     );
    //     const submitButton = await (waitFor(() => getByRole('button', { name: 'Submit' })));

    //     const titleInputField = getByTestId('title-id');
    //     // const categorySelectField = getByTestId('category-field');
    //     // const subCategorySelectField = getByTestId('sub-category-field');
    //     const descriptionField = getByTestId('description-field');

    //     fireEvent.change(titleInputField, { target: { value: "something that i wish" } });
    //     fireEvent.change(descriptionField, { target: { value: "something that i wish" } });
    //     fireEvent.click(submitButton);

    //     expect(titleInputField.value).toBe('');
    //     expect(descriptionField.value).toBe('');
    // });

});
