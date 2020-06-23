import { create } from 'apisauce';
import { networkCallWithApisauce } from '../../../../utils/APIUtils';
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants';
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index';
import endPoints from '../endPoints';

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: EnvironmentConstants.LogIn_BASE_URL
      });
   }

   logInAPI = (logInDetails) => {
      return networkCallWithApisauce(
         this.api,
         endPoints.LogIn, logInDetails,
         apiMethods.post
      );
   }
   logOutAPI = () => {
      return networkCallWithApisauce(
         this.api,
         endPoints.LogOut, {},
         apiMethods.delete
      );
   }
}

export default AuthService;
