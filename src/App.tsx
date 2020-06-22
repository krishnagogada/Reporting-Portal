import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import HomePage from './components/HomePage';
import Page1 from './components/Page1';
import authStore from './common/stores/index.js';
import { LogInRoute } from './Reporting_Portal/Authentication/routes/LogInRoute';
import { SignUpRoute } from './Reporting_Portal/Authentication/routes/SignUpRoute';
import { UserObservationsListPageRoute } from './Reporting_Portal/User/routes/UserObservationsListPageRoute';
import { UserReportingPageRoute } from './Reporting_Portal/User/routes/UserReportingPageRoute';
import UserObservationPageRoute from './Reporting_Portal/User/routes/UserObservationPageRoute/UserObservationPageRoute.jsx';
import { RpAssignedObservationsListPageRoute } from './Reporting_Portal/RpReportingPortal/routes/RpAssignedObservationsListPageRoute';
import { AdminObservationsListRoute } from './Reporting_Portal/Admin/routes/AdminObservationsListRoute';

import './App.css';

const App = () => {
   return (
      <Provider {...authStore}>
         <Router basename={process.env.PUBLIC_URL}>
            <Switch>
               { LogInRoute }
               {SignUpRoute}
               { UserObservationsListPageRoute }
               { UserReportingPageRoute }
               { RpAssignedObservationsListPageRoute }
               { AdminObservationsListRoute }
               <Route exact path='/page-1'>
                  <Page1 />
               </Route>
               <Route exact path='/user-observation-page'>
                  <UserObservationPageRoute />
               </Route>
               <Route path='/'>
                  <HomePage />
               </Route>
            </Switch>
         </Router>
      </Provider>
   )
}

export default App
// <Route exact path='/rp-observations-list'>
//                   <RpAssignedObservationsListPageRoute />
//                </Route>

// <Route exact path='/admin-observations-list'>
//                   <AdminObservationsListRoute />
//                </Route>
// <Route exact path='/rp-assigned-observations-list'>
//                   <RpAssignedObservationPageRoute />
//                </Route>
