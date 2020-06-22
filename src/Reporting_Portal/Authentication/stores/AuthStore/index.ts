import { observable, action } from 'mobx';
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { getUserDisplayableErrorMessage } from '../../../../utils/APIUtils.js';
import { setAccessToken, setRoleType, clearUserSession, clearRoleType } from '../../../../utils/StorageUtils';

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
      this.type = logInResponse.type.toLowerCase();
      setRoleType(logInResponse.type.toLowerCase());
      this.logInResponse = logInResponse;
      setAccessToken(logInResponse.access_token);
   }

   @action.bound
   setGetUserLogInAPIError(error) {
      this.getUserLogInAPIError = getUserDisplayableErrorMessage(error);
   }

   @action.bound
   setGetUserLogInAPIStatus(apiStatus) {
      this.getUserLogInAPIStatus = apiStatus;
   }

   @action.bound
   userLogOut() {
      this.authAPIService.logOutAPI();
      clearUserSession();
      clearRoleType();
   }
}

export default AuthStore;
