import AuthService from '../../Reporting_Portal/Authentication/services/AuthService/index.api.js';
import { AuthFixtureService } from '../../Reporting_Portal/Authentication/services/AuthService/index.fixtures.js';
import AuthStore from '../../Reporting_Portal/Authentication/stores/AuthStore/index.js';
import UserService from '../../Reporting_Portal/User/services/UserService/index.api.js';
import UserFixtureService from '../../Reporting_Portal/User/services/UserService/index.fixtures.js';
import UserStore from '../../Reporting_Portal/User/stores/UserStore/index.js';
import RpService from '../../Reporting_Portal/RpReportingPortal/services/RpService/index.api.js';
import RpFixtueService from '../../Reporting_Portal/RpReportingPortal/services/RpService/index.fixtures.js';
import RpStore from '../../Reporting_Portal/RpReportingPortal/stores/RpStore/index.js';

const authService = new AuthService();
const authFixtureStore = new AuthFixtureService();
const authStore = new AuthStore(authFixtureStore);

const userService = new UserService();
const userFixtureService = new UserFixtureService();
const userStore = new UserStore(userFixtureService);

const rpService = new RpService();
const rpFixtureService = new RpFixtueService();
const rpStore = new RpStore(rpFixtureService, userFixtureService);

export default { authStore, userStore, rpStore };
