import AuthService from '../../Reporting_Portal/Authentication/services/AuthService/index.api';
import { AuthFixtureService } from '../../Reporting_Portal/Authentication/services/AuthService/index.fixtures';
import AuthStore from '../../Reporting_Portal/Authentication/stores/AuthStore/index';

import UserService from '../../Reporting_Portal/User/services/UserService/index.api';
import UserFixtureService from '../../Reporting_Portal/User/services/UserService/index.fixtures';
import UserStore from '../../Reporting_Portal/User/stores/UserStore/index';

import RpService from '../../Reporting_Portal/RpReportingPortal/services/RpService/index.api';
import RpFixtueService from '../../Reporting_Portal/RpReportingPortal/services/RpService/index.fixtures';
import RpStore from '../../Reporting_Portal/RpReportingPortal/stores/RpStore/index';

import AdminService from '../../Reporting_Portal/Admin/services/AdminService/index.api';
import AdminFixtureService from '../../Reporting_Portal/Admin/services/AdminService/index.fixtures';
import AdminStore from '../../Reporting_Portal/Admin/stores/AdminStore';

import PaginationStore from './PaginationStore';

const authService = new AuthService();
const authFixtureStore = new AuthFixtureService();
const authStore = new AuthStore(authFixtureStore);

const paginationStore = new PaginationStore();

const userService = new UserService();
const userFixtureService = new UserFixtureService();
const userStore = new UserStore(userFixtureService);

const rpService = new RpService();
const rpFixtureService = new RpFixtueService();
const rpStore = new RpStore(rpFixtureService, userFixtureService);

const adminService = new AdminService();
const adminFixtureService = new AdminFixtureService();
const adminStore = new AdminStore(adminFixtureService, rpFixtureService, userFixtureService);

export default { authStore , userStore, rpStore, adminStore};