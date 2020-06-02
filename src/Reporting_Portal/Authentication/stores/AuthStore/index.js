import { observable, action } from 'mobx';
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';

import { setAccessToken, clearUserSession } from '../../utils/StorageUtils';

class AuthStore {
   @observable getUserLogInAPIStatus
   @observable getUserLogInAPIError
   @observable authAPIService
   @observable logInResponse
   @observable type

   constructor(logInAPI) {
      this.getUserLogInAPIStatus = API_INITIAL;
      this.getUserLogInAPIError = null;
      this.authAPIService = logInAPI;
   }

   @action
   userLogIn = async(logInDetails) => {
      const LogInPromise = this.authAPIService.logInAPI(logInDetails);

      await bindPromiseWithOnSuccess(LogInPromise)
         .to(this.setGetUserLogInAPIStatus, this.setUserLogInAPIResponse)
         .catch(this.setGetUserLogInAPIError);
   }
   @action.bound
   setUserLogInAPIResponse(logInResponse) {
      this.type = logInResponse.type;
      this.logInResponse = logInResponse;
      setAccessToken(logInResponse);

   }

   @action.bound
   setGetUserLogInAPIError(error) {

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

export default AuthStore
