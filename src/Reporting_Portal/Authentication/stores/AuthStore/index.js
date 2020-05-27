import { observable, action, computed } from 'mobx';
import { API_INITIAL, API_FETCHING, API_SUCCESS, API_FAILED } from "@ib/api-constants";
import { bindPromiseWithOnSuccess } from "@ib/mobx-promise";

import { setAccessToken, clearUserSession } from "../../utils/StorageUtils";

class AuthStore {

    @observable getUserLogInAPIStatus
    @observable getUserLogInAPIError
    @observable authAPIService

    constructor(logInAPI) {
        this.getUserLogInAPIStatus = API_INITIAL;
        this.getUserLogInAPIError = null;
        this.authAPIService = logInAPI;
    }

    @action.bound
    userLogIn() {
        const LogInPromise = this.authAPIService.logInAPI();

        bindPromiseWithOnSuccess(LogInPromise)
            .to(this.setGetUserLogInAPIStatus, this.setUserLogInAPIResponse)
            .catch(this.setGetUserLogInAPIError);

    }
    @action.bound
    setUserLogInAPIResponse(LogInResponse) {

        LogInResponse.forEach((eachObject) => { setAccessToken(eachObject.access_token) });

    }

    @action.bound
    setGetUserLogInAPIError(error) {
        console.log(error)
        this.getUserLogInAPIError = error;

    }

    @action.bound
    setGetUserLogInAPIStatus(apiStatus) {

        this.getUserLogInAPIStatus = apiStatus;

    }

    @action.bound
    userLogOut() {

        clearUserSession();

    }
}

export default AuthStore;
