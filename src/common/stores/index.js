import AuthService from '../../Reporting_Portal/Authentication/services/AuthService/index.api.js'
import AuthStore from '../../Reporting_Portal/Authentication/stores/AuthStore/index.js'

const authService = new AuthService()
const authStore = new AuthStore(authService)

export { authStore }
