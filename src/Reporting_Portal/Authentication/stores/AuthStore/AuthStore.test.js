/*global jest*/
/*global expect*/
import Cookie from 'js-cookie';
import { API_INITIAL, API_SUCCESS, API_FAILED, API_FETCHING } from "@ib/api-constants";

import AuthAPI from "../../services/AuthService/index.api.js";
import getUserLogInResponse from "../../fixtures/getUserLogInResponse.json";

import AuthStore from '.';

let mockSetCookie = jest.fn();
let mockRemoveCookie = jest.fn();

Cookie.set = mockSetCookie;
Cookie.remove = mockRemoveCookie;

describe("AuthStore from Reporting Portal", () => {

    let authAPI;
    let authStore;

    beforeEach(() => {
        authAPI = new AuthAPI();
        authStore = new AuthStore(authAPI);
    });

    it("should test initialising auth store", () => {
        expect(authStore.getUserLogInAPIStatus).toBe(API_INITIAL);
        expect(authStore.getUserLogInAPIError).toBe(null);
    });

    it("should test userLogInAPI data fetching state", () => {

        const mockLoadingPromise = new Promise(function(resolve, reject) {});
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockLoadingPromise);
        authAPI.logInAPI = mockLogInAPI;

        authStore.userLogIn();
        expect(authStore.getUserLogInAPIStatus).toBe(API_FETCHING);
    });
    it("should test userLogInAPI success state", async() => {

        const mockSuccessPromise = new Promise(function(resolve, reject) { resolve(getUserLogInResponse) });
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockSuccessPromise);
        authAPI.logInAPI = mockLogInAPI;

        await authStore.userLogIn();
        expect(authStore.getUserLogInAPIStatus).toBe(API_SUCCESS);
        expect(mockSetCookie).toBeCalled();

    });
    it("should test userLogInAPI failure state", async() => {

        const mockFailurePromise = Promise.reject();
        const mockLogInAPI = jest.fn();
        mockLogInAPI.mockReturnValue(mockFailurePromise);
        authAPI.logInAPI = mockLogInAPI;

        await authStore.userLogIn();
        expect(authStore.getUserLogInAPIStatus).toBe(API_FAILED);

    });

    it("should test user sign-out", () => {

        authStore.userLogOut();
        expect(mockRemoveCookie).toBeCalled();

    });

});
