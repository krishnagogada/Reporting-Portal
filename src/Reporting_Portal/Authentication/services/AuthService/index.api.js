import { create } from 'apisauce'
import { networkCallWithApisauce } from '../../utils/APIUtils'
import { apiMethods } from '../../../../common/constants/apiConstants/APIConstants'
import { EnvironmentConstants } from '../../../../common/constants/environmentConstants/index.js'
import endPoints from '../endPoints.js'

class AuthService {
   api
   constructor() {
      this.api = create({
         baseURL: EnvironmentConstants.SignIn_BASE_URL
      })
   }

   logInAPI = () => {
      return networkCallWithApisauce(
         this.api,
         endPoints.LogIn,
         {},
         apiMethods.get
      )
   }
}

export default AuthService
