/*global jest*/
/*global expect*/
import Cookie from 'js-cookie';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import RpFixtureService from "../../services/RpService/index.fixtures.js";
import rpAssignedObservationsList from "../../fixtures/rpAssignedObservationsList.json";

import RpStore from '.';

describe("rp store testing", () => {

    let rpService;
    let rpStore;

    beforeEach(() => {
        rpService = new RpFixtureService();
        rpStore = new RpStore(rpService);
    });

    it("should test initialising user store", () => {
        expect(rpStore.getUpdatedObservationAPIStatus).toBe(API_INITIAL);
        expect(rpStore.getUpdatedObservationAPIError).toBe(null);
        expect(rpStore.getAssignedObservationsListAPIStatus).toBe(API_INITIAL);
        expect(rpStore.getAssignedObservationsListAPIError).toBe(null);

        expect(rpStore.assignedObservationsList).toEqual([]);
        expect(rpStore.sortType).toBe('LatestReported');
        expect(rpStore.totalObservationsListSortType).toBe('Latest');
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

    it("should test update a observation fetching state", () => {

        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();

        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        rpService.updateAssignedObservationAPI = mockLogInAPI;

        rpStore.updateObservation();
        expect(rpStore.getUpdatedObservationAPIStatus).toBe(API_FETCHING);
    });

    it("should test update a observation success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(rpAssignedObservationsList) });
        const mockLogInAPI = jest.fn();

        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        rpService.updateAssignedObservationAPI = mockLogInAPI;

        await rpStore.updateObservation();
        expect(rpStore.getUpdatedObservationAPIStatus).toBe(API_SUCCESS);

    });

    it("should test reported on filter", () => {

        rpStore.totalObservationsListSortType = 'Latest';
        rpStore.onClickAssignedObservationsReportedOn();
        expect(rpStore.sortType).toBe('latestReported');
        expect(rpStore.totalObservationsListSortType).toBe('Oldest');
        rpStore.totalObservationsListSortType = 'Oldest';
        rpStore.onClickAssignedObservationsReportedOn();
        expect(rpStore.sortType).toBe('oldestReported');
        expect(rpStore.totalObservationsListSortType).toBe('Latest');
    });

    it("should test due date filter", () => {

        rpStore.totalObservationsListSortType = 'Latest';
        rpStore.onClickAssignedObservationsDueDate();
        expect(rpStore.sortType).toBe('latestDueDate');
        expect(rpStore.totalObservationsListSortType).toBe('Oldest');
        rpStore.totalObservationsListSortType = 'Oldest';
        rpStore.onClickAssignedObservationsDueDate();
        expect(rpStore.sortType).toBe('oldestDueDate');
        expect(rpStore.totalObservationsListSortType).toBe('Latest');

    });

    it("should test offset when click on page number", () => {
        rpStore.assignedObservationsLimit = 8;
        rpStore.assignedObservationsOffset = 0;
        rpStore.onClickAssignedObservationsPageNumber(3);
        expect(rpStore.assignedObservationsOffset).toBe(24);
        rpStore.assignedObservationsLimit = 8;
        rpStore.assignedObservationsOffset = 10;
        rpStore.onClickAssignedObservationsPageNumber(10);
        expect(rpStore.assignedObservationsOffset).toBe(80);
    });

});
