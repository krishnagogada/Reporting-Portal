/*global jest*/
/*global expect*/
import Cookie from 'js-cookie';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";
import UserFixtureService from '../../../User/services/UserService/index.fixtures.js';
import UserService from '../../../User/services/UserService/index.api.js';

import RpFixtureService from "../../services/RpService/index.fixtures.js";
import RpService from "../../services/RpService/index.api.js";
import rpAssignedObservationsList from "../../fixtures/rpAssignedObservationsList.json";

import RpStore from '.';

describe("rp store testing", () => {

    let rpService;
    let rpStore;
    let userService;
    let rpAPIService;
    let rpAPIStore;
    let userAPIService;

    beforeEach(() => {
        rpService = new RpFixtureService();
        userService = new UserFixtureService();
        rpStore = new RpStore(rpService, userService);
        rpAPIService = new RpService();
        userAPIService = new UserService();
        rpAPIStore = new RpStore(rpAPIService, userAPIService);
    });

    it("should test initialising user store", () => {
        expect(rpStore.getUpdatedObservationAPIStatus).toBe(API_INITIAL);
        expect(rpStore.getUpdatedObservationAPIError).toBe(null);
        expect(rpStore.getAssignedObservationsListAPIStatus).toBe(API_INITIAL);
        expect(rpStore.getAssignedObservationsListAPIError).toBe(null);
        expect(rpStore.assignedObservationsList).toEqual([]);
        expect(rpStore.sortType).toBe('latestReported');
        expect(rpStore.assignedObservationsListSortType).toBe('Latest');
        expect(rpStore.assignedObservationsLimit).toBe(8);
        expect(rpStore.assignedObservationsOffset).toBe(0);
        expect(rpStore.totalAssignedObservations).toBe(0);
    });

    it("should test assigned observations list data fetching state", () => {

        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();

        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        rpService.getAssignedObservationsListAPI = mockLogInAPI;

        rpStore.getAssignedObservationsList();
        expect(rpStore.getAssignedObservationsListAPIStatus).toBe(API_FETCHING);
    });

    it("should test assigned observations list success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(rpAssignedObservationsList) });
        const mockLogInAPI = jest.fn();

        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        rpService.getAssignedObservationsListAPI = mockLogInAPI;

        await rpStore.getAssignedObservationsList();
        expect(rpStore.getAssignedObservationsListAPIStatus).toBe(API_SUCCESS);

    });

    it("should test assigned observations list failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();

        mockLogInAPI.mockReturnValue(mockFailurePromise);
        rpService.getAssignedObservationsListAPI = mockLogInAPI;

        await rpStore.getAssignedObservationsList();
        expect(rpStore.getAssignedObservationsListAPIStatus).toBe(API_FAILED);

    });

    it("should test reported on filter", () => {

        rpStore.assignedObservationsListSortType = 'Latest';
        rpStore.onClickAssignedObservationsReportedOn();
        expect(rpStore.sortType).toBe('oldestReported');
        expect(rpStore.assignedObservationsListSortType).toBe('Oldest');
        rpStore.assignedObservationsListSortType = 'Oldest';
        rpStore.onClickAssignedObservationsReportedOn();
        expect(rpStore.sortType).toBe('latestReported');
        expect(rpStore.assignedObservationsListSortType).toBe('Latest');
    });

    it("should test due date filter", () => {

        rpStore.assignedObservationsListSortType = 'Latest';
        rpStore.onClickAssignedObservationsDueDate();
        expect(rpStore.sortType).toBe('oldestDueDate');
        expect(rpStore.assignedObservationsListSortType).toBe('Oldest');
        rpStore.assignedObservationsListSortType = 'Oldest';
        rpStore.onClickAssignedObservationsDueDate();
        expect(rpStore.sortType).toBe('latestDueDate');
        expect(rpStore.assignedObservationsListSortType).toBe('Latest');

    });

    it("should test filter", () => {

        let selectedFilters = { value: 'REPORTED' };
        rpStore.onChangeRpFilter(selectedFilters);
        expect(rpStore.rpSelectedFilter).toStrictEqual(selectedFilters.value);

    });

    it("should test offset when click on page number", () => {
        rpStore.assignedObservationsLimit = 8;
        rpStore.assignedObservationsOffset = 0;
        rpStore.onClickAssignedObservationsPageNumber(0);
        expect(rpStore.assignedObservationsOffset).toBe(1);
        rpStore.onClickAssignedObservationsPageNumber(3);
        expect(rpStore.assignedObservationsOffset).toBe(24);
        rpStore.assignedObservationsLimit = 8;
        rpStore.assignedObservationsOffset = 10;
        rpStore.onClickAssignedObservationsPageNumber(10);
        expect(rpStore.assignedObservationsOffset).toBe(80);
    });

});
