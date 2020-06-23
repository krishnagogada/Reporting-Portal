// /*global jest*/
// /*global expect*/
// import Cookie from 'js-cookie';
// import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

// import RpFixtureService from '../../../RpReportingPortal/services/RpService/index.fixtures.js';
// import RpService from '../../../RpReportingPortal/services/RpService/index.api.js';
// import UserFixtureService from '../../../User/services/UserService/index.fixtures.js';
// import UserService from '../../../User/services/UserService/index.api.js';
// import AdminFixtureService from "../../services/AdminService/index.fixtures.js";
// import AdminService from "../../services/AdminService/index.api.js";
// import getTotalObservationsList from "../../fixtures/getTotalObservationsList.json";

// import AdminStore from '.';

// describe("admin store testing", () => {

//     let userService;
//     let rpService;
//     let adminService;
//     let adminStore;
//     let userAPIService;
//     let rpAPIService;
//     let adminAPIService;
//     let adminAPIStore;

//     beforeEach(() => {
//         userService = new UserFixtureService();
//         rpService = new RpFixtureService();
//         adminService = new AdminFixtureService();
//         adminStore = new AdminStore(adminService, rpService, userService);

//         userAPIService = new UserService();
//         rpAPIService = new RpService();
//         adminAPIService = new AdminService();
//         adminAPIStore = new AdminStore(adminAPIService, rpAPIService, userAPIService);
//     });

//     it("should test initialising admin store", () => {
//         expect(adminStore.getTotalObservationsAPIStatus).toBe(API_INITIAL);
//         expect(adminStore.getTotalObservationsAPIError).toBe(null);

//         expect(adminStore.totalObservationsList).toEqual([]);
//         expect(adminStore.categories).toEqual([]);
//         expect(adminStore.subCategories).toEqual([]);
//         expect(adminStore.dueDateSortType).toBe('latestDueDate');
//         expect(adminStore.totalObservationsLimit).toBe(8);
//         expect(adminStore.totalObservationsOffset).toBe(0);
//         expect(adminStore.totalObservations).toBe(0);
//         expect(adminStore.adminSelectedPage).toBe(0);
//     });

//     it("should test total observations list data fetching state", () => {

//         const mockLoadingPromise = new Promise(function(resolve, reject) {});
//         const mockLogInAPI = jest.fn();

//         mockLogInAPI.mockReturnValue(mockLoadingPromise);
//         adminService.getTotalObservationsListAPI = mockLogInAPI;

//         adminStore.getTotalObservationsList();
//         expect(adminStore.getTotalObservationsAPIStatus).toBe(API_FETCHING);
//     });

//     it("should test total observations list success state", async() => {

//         const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(getTotalObservationsList) });
//         const mockLogInAPI = jest.fn();

//         mockLogInAPI.mockReturnValue(mockSuccessPromise);
//         adminService.getTotalObservationsListAPI = mockLogInAPI;

//         await adminStore.getTotalObservationsList();
//         expect(adminStore.getTotalObservationsAPIStatus).toBe(API_SUCCESS);

//     });

//     it("should test total observations list failure state", async() => {

//         const mockFailurePromise = Promise.reject();
//         const mockLogInAPI = jest.fn();

//         mockLogInAPI.mockReturnValue(mockFailurePromise);
//         adminService.getTotalObservationsListAPI = mockLogInAPI;

//         await adminStore.getTotalObservationsList();
//         expect(adminStore.getTotalObservationsAPIStatus).toBe(API_FAILED);

//     });

//     it("should test due date filter", () => {

//         adminStore.dueDateSortType = 'latestDueDate';
//         adminStore.onClickAdminDueDate();
//         expect(adminStore.dueDateSortType).toBe('oldestDueDate');
//         adminStore.dueDateSortType = 'oldestDueDate';
//         adminStore.onClickAdminDueDate();
//         expect(adminStore.dueDateSortType).toBe('latestDueDate');

//     });

//     it("should test offset when click on page number", () => {
//         adminStore.totalObservationsLimit = 8;
//         adminStore.totalObservationsOffset = 0;
//         adminStore.onClickAdminObservationStorePageNumber(3);
//         expect(adminStore.totalObservationsOffset).toBe(24);
//         adminStore.totalObservationsLimit = 8;
//         adminStore.totalObservationsOffset = 10;
//         adminStore.onClickAdminObservationStorePageNumber(10);
//         expect(adminStore.totalObservationsOffset).toBe(80);
//     });

//     it("should test admin filter", () => {

//         let selectedFilter = 'ALL';
//         adminStore.onChangeAdminFilter(selectedFilter);
//         expect(adminStore.adminSelectedFilter).toBe('');
//         selectedFilter = 'REPORTED';
//         adminStore.onChangeAdminFilter(selectedFilter);
//         expect(adminStore.adminSelectedFilter).toBe('REPORTED');

//     });

//     it("should test categories filter", () => {

//         let selectedFilter = ['Assert Manganment'];
//         adminStore.onChangeAdminCategory(selectedFilter);
//         expect(adminStore.categories).toStrictEqual(['Assert Manganment']);
//         selectedFilter = ['Assert Manganment', 'Care Takers'];
//         adminStore.onChangeAdminCategory(selectedFilter);
//         expect(adminStore.categories).toStrictEqual(['Assert Manganment', 'Care Takers']);

//     });

//     it("should test sub categories filter", () => {

//         let selectedFilter = ['Assert Manganment'];
//         adminStore.onChangeAdminSubCategory(selectedFilter);
//         expect(adminStore.subCategories).toStrictEqual(['Assert Manganment']);
//         selectedFilter = ['Assert Manganment', 'Care Takers'];
//         adminStore.onChangeAdminSubCategory(selectedFilter);
//         expect(adminStore.subCategories).toStrictEqual(['Assert Manganment', 'Care Takers']);

//     });

// });
