/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import AdminService from "../../services/AdminService/index.fixtures";
import AdminStore from "../../stores/AdminStore/index";
import RpFixtureService from '../../../RpReportingPortal/services/RpService/index.fixtures';
import UserFixtureService from '../../../User/services/UserService/index.fixtures';
import { AuthFixtureService } from '../../../Authentication/services/AuthService/index.fixtures';
import AuthStore from '../../../Authentication/stores/AuthStore/index';
import { ADMIN_OBSERVATIONS_LIST_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
import { USER_OBSERVATIONS_LIST_PATH } from '../../../User/constants/routeConstants/RouteConstants';

import AdminObservationsListRoute from './AdminObservationsListRoute';

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("testing for admin total observation list page route", () => {

    let adminService;
    let rpService;
    let userService;
    let adminStore;
    let authStore;
    let authService;
    beforeEach(() => {
        adminService = new AdminService();
        rpService = new RpFixtureService();
        userService = new UserFixtureService();
        adminStore = new AdminStore(adminService, rpService, userService);
        authService = new AuthFixtureService();
        authStore = new AuthStore(authService);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should test onclick search button", async() => {

        const history = createMemoryHistory();
        const route = ADMIN_OBSERVATIONS_LIST_PAGE_PATH;
        history.push(route);

        const { getByRole } = render(
            <Provider adminStore={adminStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={ADMIN_OBSERVATIONS_LIST_PAGE_PATH }>
                        <AdminObservationsListRoute/>
                    </Route>
                </Router>
            </Provider>
        );
        let searchButton ;
        await (waitFor(() => searchButton=getByRole("button", { name: 'Search' })));
        fireEvent.click(searchButton);
    });


    it("should test onclick observation cell", async() => {

        const history = createMemoryHistory();
        const route = ADMIN_OBSERVATIONS_LIST_PAGE_PATH;
        history.push(route);

        const { getAllByTestId, getByTestId } = render(
            <Provider adminStore={adminStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={ADMIN_OBSERVATIONS_LIST_PAGE_PATH }>
                        <AdminObservationsListRoute/>
                    </Route>
                    <Route path={USER_OBSERVATIONS_LIST_PATH}>
                        <LocationDisplay />
                    </Route>
                </Router>
            </Provider>
        );
        const observationCell = await (waitFor(() => getAllByTestId("observation-cell")));
        fireEvent.click(observationCell[0]);
        await waitFor(() => {
            getByTestId("location-display")
        });
    });

    it("should test total observations nav switcher",async()=>{
        const history = createMemoryHistory();
        const route = ADMIN_OBSERVATIONS_LIST_PAGE_PATH;
        history.push(route);

        authStore.setUserLogInAPIResponse({type:'ADMIN'});

        const { getByText, getAllByTestId } = render(
            <Provider adminStore={adminStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={ADMIN_OBSERVATIONS_LIST_PAGE_PATH }>
                        <AdminObservationsListRoute />
                    </Route>
                </Router>
            </Provider>
        );
        let totalObservationsNavSwitch 
        await waitFor(() =>{
            totalObservationsNavSwitch= getByText('Total Observations')
        });
        fireEvent.click(totalObservationsNavSwitch);
        await waitFor(()=>getAllByTestId("observation-cell"))
    })
});
