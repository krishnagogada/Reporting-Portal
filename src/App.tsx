import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';

// import HomePage from './components/HomePage';
const HomePage = lazy(()=>import('./components/HomePage'))
const Page1 = lazy(()=>import('./components/Page1'))
import authStore from './common/stores/index';

import { LogInRoute } from './Reporting_Portal/Authentication/routes/LogInRoute';
import { ProtectedRoute } from './common/components/ProtectedRoute/index'
// import { SignUpRoute } from './Reporting_Portal/Authentication/routes/SignUpRoute';
// import { UserObservationsListPageRoute } from './Reporting_Portal/User/routes/UserObservationsListPageRoute';
// import { UserReportingPageRoute } from './Reporting_Portal/User/routes/UserReportingPageRoute';
// import {UserObservationPageRoute} from './Reporting_Portal/User/routes/UserObservationPageRoute'
// import { RpAssignedObservationsListPageRoute } from './Reporting_Portal/RpReportingPortal/routes/RpAssignedObservationsListPageRoute';
// import { AdminObservationsListRoute } from './Reporting_Portal/Admin/routes/AdminObservationsListRoute';
import {UserRoutes} from './Reporting_Portal/User/routes/index'
import {RpRoutes} from './Reporting_Portal/RpReportingPortal/routes/index'
import {AdminRoutes} from './Reporting_Portal/Admin/routes/index'

const Routes=UserRoutes.concat(RpRoutes,AdminRoutes)
import './App.css';

const App = () => {
   console.log(LogInRoute)
   return (
      <Provider {...authStore}>
         <Suspense fallback={<div />}>
            <Router basename={process.env.PUBLIC_URL}>
               <Switch>
                  { LogInRoute }
                  {/* {SignUpRoute} */}
                  {/* { UserObservationsListPageRoute }
                  { UserReportingPageRoute }
                  {UserObservationPageRoute}
                  { RpAssignedObservationsListPageRoute } 
                   { AdminObservationsListRoute } */}
                  {Routes.map((eachRoute)=>{
                     return <ProtectedRoute path={eachRoute.path} component={eachRoute.component}/>
                  })}
                  <Route exact path='/page-1'>
                     <Page1 />
                  </Route>
                  <Route path='/'>
                     <HomePage />
                  </Route>
               </Switch>
         </Router>
         </Suspense>
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
{/* <Route exact path='/user-observation-page'>
                  <UserObservationPageRoute />
               </Route> */}
