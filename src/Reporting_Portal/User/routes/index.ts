import React,{lazy} from 'react'

import { USER_OBSERVATION_PAGE_PATH,
         USER_OBSERVATIONS_LIST_PATH,
         USER_REPORTING_PAGE_PATH 
        } from '../constants/routeConstants/RouteConstants'

const UserObservationPageRoute = lazy(()=>import('./UserObservationPageRoute/UserObservationPageRoute'))
const UserObservationsListPageRoute = lazy(()=>import ('./UserObservationsListPageRoute/UserObservationsListPageRoute'))
const UserReportingPageRoute = lazy(()=>import('./UserReportingPageRoute/UserReportingPageRoute'))

export const UserRoutes=[
                            {path:USER_OBSERVATION_PAGE_PATH,component:UserObservationPageRoute},
                            {path:USER_OBSERVATIONS_LIST_PATH,component:UserObservationsListPageRoute},
                            {path:USER_REPORTING_PAGE_PATH,component:UserReportingPageRoute}
                        ]
