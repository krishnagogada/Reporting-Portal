/*global jest*/
/*global expect*/
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Router, Route, withRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { createMemoryHistory } from "history";

import RpService from "../../services/RpService/index.fixtures";
import RpStore from "../../stores/RpStore/index";
import UserFixtureService from '../../../User/services/UserService/index.fixtures';
import { AuthFixtureService } from '../../../Authentication/services/AuthService/index.fixtures';
import AuthStore from '../../../Authentication/stores/AuthStore/index';
import { RP_OBSERVATIONS_LIST_PAGE_PATH } from '../../constants/routeConstants/RouteConstants';
import { USER_OBSERVATION_LIST_PATH } from '../../../User/constants/routeConstants/RouteConstants';

import RpAssignedObservationsListPageRoute from './RpAssignedObservationsListPageRoute';

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid='location-display'>{location.pathname}</div>
));

describe("testing for rp assigned observation list page route", () => {

    let rpService;
    let rpStore;
    let userService
    let authStore;
    let authService;
    beforeEach(() => {
        rpService = new RpService();
        userService=new UserFixtureService();
        rpStore = new RpStore(rpService,userService);
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
        await waitFor(() => {
            // expect(getByTestId('observation-cell')).not.toBeInTheDocument();
            // expect().toHaveTextContent( USER_OBSERVATION_LIST_PATH);
            getByTestId("location-display")
        });
    });

    it("should test the rp nav switchers of assigned to me",async()=>{
        const history = createMemoryHistory();
        const route = RP_OBSERVATIONS_LIST_PAGE_PATH;
        history.push(route);

        authStore.setUserLogInAPIResponse({type:'RP'});

        const { getByText, getAllByTestId } = render(
            <Provider rpStore={rpStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={RP_OBSERVATIONS_LIST_PAGE_PATH }>
                        <RpAssignedObservationsListPageRoute />
                    </Route>
                </Router>
            </Provider>
        );
        const assignedToMeNavSwitch = await waitFor(() => getByText('Assigned to me'));
        fireEvent.click(assignedToMeNavSwitch);
        getAllByTestId("observation-cell")
    })

    it("should test the rp nav switchers of my observations",async()=>{
        const history = createMemoryHistory();
        const route = RP_OBSERVATIONS_LIST_PAGE_PATH;
        history.push(route);

        authStore.setUserLogInAPIResponse({type:'RP'});

        const { getByText, getByTestId } = render(
            <Provider rpStore={rpStore} authStore={authStore}>
                <Router history={history}>
                    <Route path={RP_OBSERVATIONS_LIST_PAGE_PATH }>
                        <RpAssignedObservationsListPageRoute />
                    </Route>
                    <Route path={USER_OBSERVATION_LIST_PATH}>
                        <LocationDisplay/>
                    </Route>
                </Router>
            </Provider>
        );
        const myObservationsNavSwitch = await waitFor(() => getByText('My Observations'));
        fireEvent.click(myObservationsNavSwitch);
        getByTestId("location-display")
    })
});
