/*global jest*/
/*global expect*/
import Cookie from 'js-cookie';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";

import UserFixtureService from "../../services/UserService/index.fixtures";
import UserService from "../../services/UserService/index.api";
import userObservationsList from "../../fixtures/userObservationsList.json";
import userSingleObservation from "../../fixtures/userSingleObservation.json";
import categoryAndSubCategoryList from "../../fixtures/categoryAndSubCategoryList.json";
import userSingleObservationWithRpAndCategories from "../../fixtures/userSingleObservationWithRpAndCategories.json";

import UserStore from '.';

describe("user store testing", () => {

    let userFixtureService;
    let userAPIService;
    let userFixtureStore;
    let userAPIStore;

    beforeEach(() => {
        userFixtureService = new UserFixtureService();
        userAPIService = new UserService();
        userFixtureStore = new UserStore(userFixtureService);
        userAPIStore = new UserStore(userAPIService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should test initialising user store", () => {

        expect(userFixtureStore.getObservationsListAPIStatus).toBe(API_INITIAL);
        expect(userFixtureStore.getObservationsListAPIError).toBe(null);

        expect(userFixtureStore.getReportedObservationAPIStatus).toBe(API_INITIAL);
        expect(userFixtureStore.getReportedObservationAPIError).toBe(null);

        expect(userFixtureStore.getSingleUserObservationAPIStatus).toBe(API_INITIAL);
        expect(userFixtureStore.getSingleUserObservationAPIError).toBe(null);

        expect(userFixtureStore.getCategoryAndSubCategoryListAPIStatus).toBe(API_INITIAL);
        expect(userFixtureStore.getCategoryAndSubCategoryListAPIError).toBe(null);

        expect(userFixtureStore.getUpdatedObservationAPIStatus).toBe(API_INITIAL);
        expect(userFixtureStore.getUpdatedObservationAPIError).toBe(null);

        expect(userFixtureStore.getUpdatedObservationByAdminAPIStatus).toBe(API_INITIAL);
        expect(userFixtureStore.getUpdatedObservationByAdminAPIError).toBe(null);

        expect(userFixtureStore.observationsList).toEqual([]);
        expect(userFixtureStore.sortType).toBe('latestReported');
        expect(userFixtureStore.totalObservationsListSortType).toBe('Latest');
        expect(userFixtureStore.userObservationsStoreLimit).toBe(8);
        expect(userFixtureStore.userObservationsStoreOffset).toBe(0);
        expect(userFixtureStore.userObservationsStoreTotal).toBe(0);
    });

    it("should test observations list data fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userFixtureService.getObservationsListAPI = mockLogInAPI;

        userFixtureStore.getObservationsList();
        expect(userFixtureStore.getObservationsListAPIStatus).toBe(API_FETCHING);
    });

    it("should test observations list success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userObservationsList) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.getObservationsListAPI = mockLogInAPI;

        await userFixtureStore.getObservationsList();
        expect(userFixtureStore.getObservationsListAPIStatus).toBe(API_SUCCESS);

    });

    it("should test observations list failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        userFixtureService.getObservationsListAPI = mockLogInAPI;

        await userFixtureStore.getObservationsList();
        expect(userFixtureStore.getObservationsListAPIStatus).toBe(API_FAILED);

    });

    //----------------------------------->Create a Observation<------------------------------

    it("should test create a observation fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userFixtureService.createReportedObservation = mockLogInAPI;

        userFixtureStore.onClickSubmit();
        expect(userFixtureStore.getReportedObservationAPIStatus).toBe(API_FETCHING);
    });

    it("should test create a observation success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userObservationsList) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.createReportedObservation = mockLogInAPI;

        await userFixtureStore.onClickSubmit();
        expect(userFixtureStore.getReportedObservationAPIStatus).toBe(API_SUCCESS);

    });

    // it("should test create a observation failure state", async() => {

    //     const mockFailurePromise = new Promise((resolve, reject) => reject(new Error('error')));
    //     const mockLogInAPI = jest.fn();
    //     mockLogInAPI.mockReturnValue(mockFailurePromise);
    //     userFixtureService.createReportedObservation = mockLogInAPI;
    //     console.log(userFixtureService.createReportedObservation(), userFixtureStore.getReportedObservationAPIStatus, ">>>>>")

    //     await waitFor(() => userFixtureStore.onClickSubmit());
    //     expect(userFixtureStore.getReportedObservationAPIStatus).toBe(API_FAILED);

    // });

    //-------------------------------------->Single Observation Testing<--------------------------------

    it("should test single observation fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userFixtureService.getSingleUserObservationsDetails = mockLogInAPI;

        userFixtureStore.getSingleUserObservationDetails();
        expect(userFixtureStore.getSingleUserObservationAPIStatus).toBe(API_FETCHING);
    });

    it("should test single observation success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userSingleObservation) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.getSingleUserObservationsDetails = mockLogInAPI;

        await userFixtureStore.getSingleUserObservationDetails();
        expect(userFixtureStore.getSingleUserObservationAPIStatus).toBe(API_SUCCESS);

    });

    it("should test single observation failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        userFixtureService.getSingleUserObservationsDetails = mockLogInAPI;

        await userFixtureStore.getSingleUserObservationDetails();
        expect(userFixtureStore.getSingleUserObservationAPIStatus).toBe(API_FAILED);

    });

    it("should test single observation witho RP and category and subcategory list success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userSingleObservationWithRpAndCategories) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.getSingleUserObservationsDetails = mockLogInAPI;

        await userFixtureStore.getSingleUserObservationDetails();
        expect(userFixtureStore.getSingleUserObservationAPIStatus).toBe(API_SUCCESS);

    });


    //--------------------------------->Update Observation By Rp Testing<-------------------------------

    it("should test update observation by rp fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userFixtureService.updateAssignedObservationAPI = mockLogInAPI;

        userFixtureStore.updateObservationByRp();
        expect(userFixtureStore.getUpdatedObservationAPIStatus).toBe(API_FETCHING);
    });

    it("should test update observation by rp success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userSingleObservation) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.updateAssignedObservationAPI = mockLogInAPI;

        await userFixtureStore.updateObservationByRp();
        expect(userFixtureStore.getUpdatedObservationAPIStatus).toBe(API_SUCCESS);

    });

    it("should test update observation by rp failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        userFixtureService.updateAssignedObservationAPI = mockLogInAPI;

        await userFixtureStore.updateObservationByRp();
        expect(userFixtureStore.getUpdatedObservationAPIStatus).toBe(API_FAILED);

    });

    //----------------------------------->Category and Sub Category List<------------------------------------


    it("should test category and sub category list fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userFixtureService.getCategoryAndSubCategoryList = mockLogInAPI;

        userFixtureStore.getCategoryAndSubCategoryList();
        expect(userFixtureStore.getCategoryAndSubCategoryListAPIStatus).toBe(API_FETCHING);
    });

    it("should test category and sub category list success state", async() => {

        const mockSuccessPromise = new Promise((resolve, reject) => resolve(categoryAndSubCategoryList));
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.getCategoryAndSubCategoryList = mockLogInAPI;

        await userFixtureStore.getCategoryAndSubCategoryList();
        expect(userFixtureStore.getCategoryAndSubCategoryListAPIStatus).toBe(API_SUCCESS);

    });

    it("should test category and sub category list failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        userFixtureService.getCategoryAndSubCategoryList = mockLogInAPI;

        await userFixtureStore.getCategoryAndSubCategoryList();
        expect(userFixtureStore.getCategoryAndSubCategoryListAPIStatus).toBe(API_FAILED);

    });

    //-------------------------------------->Update The Observation By Admin Testing<-------------------

    it("should test update observation by admin fetching state", () => {
        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        userFixtureService.updateObservationByAdminAPI = mockLogInAPI;

        userFixtureStore.updateObservationByAdmin();
        expect(userFixtureStore.getUpdatedObservationByAdminAPIStatus).toBe(API_FETCHING);
    });

    it("should test update observation by admin success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(userSingleObservation) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        userFixtureService.updateObservationByAdminAPI = mockLogInAPI;

        await userFixtureStore.updateObservationByAdmin();
        expect(userFixtureStore.getUpdatedObservationByAdminAPIStatus).toBe(API_SUCCESS);

    });

    it("should test update observation by admin failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        userFixtureService.updateObservationByAdminAPI = mockLogInAPI;

        await userFixtureStore.updateObservationByAdmin();
        expect(userFixtureStore.getUpdatedObservationByAdminAPIStatus).toBe(API_FAILED);

    });

    it("should test reported on filter", () => {

        userFixtureStore.totalObservationsListSortType = 'Latest';
        userFixtureStore.onClickUserObservationStoreReportedOn();
        expect(userFixtureStore.sortType).toBe('latestReported');
        expect(userFixtureStore.totalObservationsListSortType).toBe('Oldest');
        userFixtureStore.totalObservationsListSortType = 'Oldest';
        userFixtureStore.onClickUserObservationStoreReportedOn();
        expect(userFixtureStore.sortType).toBe('oldestReported');
        expect(userFixtureStore.totalObservationsListSortType).toBe('Latest');
    });


    it("should test due date filter", () => {

        userFixtureStore.totalObservationsListSortType = 'Latest';
        userFixtureStore.onClickUserObservationStoreDueDate();
        expect(userFixtureStore.sortType).toBe('latestDueDate');
        expect(userFixtureStore.totalObservationsListSortType).toBe('Oldest');
        userFixtureStore.totalObservationsListSortType = 'Oldest';
        userFixtureStore.onClickUserObservationStoreDueDate();
        expect(userFixtureStore.sortType).toBe('oldestDueDate');
        expect(userFixtureStore.totalObservationsListSortType).toBe('Latest');

    });

    it("should test filter", () => {

        let selectedFilters = ['REPROTED', "ACKNOWNLEDGE BY RP"];
        userFixtureStore.onChangeUserFilter(selectedFilters);
        expect(userFixtureStore.selectedFilter).toStrictEqual(selectedFilters);

    });

    it("should test userObservationsStoreOffset when click on page number", () => {
        userFixtureStore.userObservationsStoreLimit = 8;
        userFixtureStore.userObservationsStoreOffset = 0;
        userFixtureStore.onClickUserObservationStorePageNumber(0);
        expect(userFixtureStore.userObservationsStoreOffset).toBe(1);
        userFixtureStore.onClickUserObservationStorePageNumber(3);
        expect(userFixtureStore.userObservationsStoreOffset).toBe(24);
        userFixtureStore.userObservationsStoreLimit = 8;
        userFixtureStore.userObservationsStoreOffset = 10;
        userFixtureStore.onClickUserObservationStorePageNumber(10);
        expect(userFixtureStore.userObservationsStoreOffset).toBe(80);
    });

});
