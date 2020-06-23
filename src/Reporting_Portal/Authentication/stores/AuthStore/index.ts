import { observable, action } from 'mobx';
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
}
from '@ib/api-constants';
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise';
import { getUserDisplayableErrorMessage } from '../../../../utils/APIUtils';
import { setAccessToken, setRoleType, clearUserSession, clearRoleType } from '../../../../utils/StorageUtils';
import { AuthFixtureService } from '../../services/AuthService/index.fixtures';

class AuthStore {
   @observable getUserLogInAPIStatus:Number
   @observable getUserLogInAPIError:any  
   @observable authAPIService:any
   @observable logInResponse:Object
   @observable type:string

   constructor(logInAPI: AuthFixtureService) {
      this.getUserLogInAPIStatus = API_INITIAL;
      this.getUserLogInAPIError = null;
      this.authAPIService = logInAPI;
      this.logInResponse={}
      this.type="user"
   }

   @action
   userLogIn = async(logInDetails: any) => {

      const LogInPromise = this.authAPIService.logInAPI(logInDetails);

      await bindPromiseWithOnSuccess(LogInPromise)
         .to(this.setGetUserLogInAPIStatus,this.setUserLogInAPIResponse)
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
   setGetUserLogInAPIError(error: string) {
      this.getUserLogInAPIError = getUserDisplayableErrorMessage(error);
   }

   @action.bound
   setGetUserLogInAPIStatus(apiStatus: Number) {
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
