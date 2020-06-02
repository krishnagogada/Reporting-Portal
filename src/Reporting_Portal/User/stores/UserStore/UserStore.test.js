/*global jest*/
/*global expect*/
import Cookie from 'js-cookie';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import UserService from "../../services/UserService/index.fixtures.js";
import userObservationsList from "../../fixtures/userObservationsList.json";

import UserStore from '.';

describe("rp store testing", () => {

    let userService;
    let userStore;

    beforeEach(() => {
        userService = new UserService();
        userStore = new UserStore(userService);
    });

    it("should test initialising user store", () => {
        expect(userStore.getObservationsListAPIStatus).toBe(API_INITIAL);
        expect(userStore.getObservationsListAPIError).toBe(null);
        expect(userStore.observationsList).toEqual([]);
        expect(userStore.categoryList).toEqual([]);
        expect(userStore.subCategoryList).toEqual([]);
        expect(userStore.severityList).toEqual([]);
        expect(userStore.sortType).toBe('LatestReported');
        expect(userStore.totalObservationsListSortType).toBe('Latest');
        expect(userStore.userObservationsStoreLimit).toBe(8);
        expect(userStore.userObservationsStoreOffset).toBe(0);
        expect(userStore.userObservationsStoreTotal).toBe(0);
    });

    it("should test observations list data fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userService.getObservationsListAPI = mockLogInAPI;

        userStore.getObservationsList();
        expect(userStore.getObservationsListAPIStatus).toBe(API_FETCHING);
    });

    it("should test observations list success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userObservationsList) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userService.getObservationsListAPI = mockLogInAPI;

        await userStore.getObservationsList();
        expect(userStore.getObservationsListAPIStatus).toBe(API_SUCCESS);

    });

    it("should test observations list failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        userService.getObservationsListAPI = mockLogInAPI;

        await userStore.getObservationsList();
        expect(userStore.getObservationsListAPIStatus).toBe(API_FAILED);

    });

    it("should test create a observation fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userService.createReportedObservation = mockLogInAPI;

        userStore.onClickSubmit();
        expect(userStore.getReportedObservationAPIStatus).toBe(API_FETCHING);
    });

    it("should test create a observation success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userObservationsList) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userService.createReportedObservation = mockLogInAPI;

        await userStore.onClickSubmit();
        expect(userStore.getReportedObservationAPIStatus).toBe(API_SUCCESS);

    });

    it("should test reported on filter", () => {

        userStore.totalObservationsListSortType = 'Latest';
        userStore.onClickUserObservationStoreReportedOn();
        expect(userStore.sortType).toBe('latestReported');
        expect(userStore.totalObservationsListSortType).toBe('Oldest');
        userStore.totalObservationsListSortType = 'Oldest';
        userStore.onClickUserObservationStoreReportedOn();
        expect(userStore.sortType).toBe('oldestReported');
        expect(userStore.totalObservationsListSortType).toBe('Latest');
    });

    it("should test due date filter", () => {

        userStore.totalObservationsListSortType = 'Latest';
        userStore.onClickUserObservationStoreDueDate();
        expect(userStore.sortType).toBe('latestDueDate');
        expect(userStore.totalObservationsListSortType).toBe('Oldest');
        userStore.totalObservationsListSortType = 'Oldest';
        userStore.onClickUserObservationStoreDueDate();
        expect(userStore.sortType).toBe('oldestDueDate');
        expect(userStore.totalObservationsListSortType).toBe('Latest');

    });

    it("should test userObservationsStoreOffset when click on page number", () => {
        userStore.userObservationsStoreLimit = 8;
        userStore.userObservationsStoreOffset = 0;
        userStore.onClickUserObservationStorePageNumber(3);
        expect(userStore.userObservationsStoreOffset).toBe(24);
        userStore.userObservationsStoreLimit = 8;
        userStore.userObservationsStoreOffset = 10;
        userStore.onClickUserObservationStorePageNumber(10);
        expect(userStore.userObservationsStoreOffset).toBe(80);
    });

});
