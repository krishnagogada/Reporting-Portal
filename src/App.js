import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

import HomePage from './components/HomePage';
import Page1 from './components/Page1';
import authStore from './common/stores/index.js';
import { LogInRoute } from './Reporting_Portal/Authentication/route/LogInRoute';
import { SignUpRoute } from './Reporting_Portal/Authentication/route/SignUpRoute';
import { UserObservationsListPageRoute } from './Reporting_Portal/User/route/UserObservationsListPageRoute';
import { UserReportingPageRoute } from './Reporting_Portal/User/route/UserReportingPageRoute';
import UserObservationPageRoute from './Reporting_Portal/User/route/UserObservationPageRoute/UserObservationPageRoute.js';
import RpAssignedObservationsListPageRoute from './Reporting_Portal/RpReportingPortal/route/RpAssignedObservationsListPageRoute/RpAssignedObservationsListPageRoute.js';
import RpAssignedObservationPageRoute from './Reporting_Portal/RpReportingPortal/route/RpAssignedObservationPageRoute/RpAssignedObservationPageRoute.js';

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
               <Route exact path='/page-1'>
                  <Page1 />
               </Route>
               <Route exact path='/rp-observations-list'>
                  <RpAssignedObservationsListPageRoute />
               </Route>
               <Route exact path='/rp-assigned-observations-list'>
                  <RpAssignedObservationPageRoute />
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
