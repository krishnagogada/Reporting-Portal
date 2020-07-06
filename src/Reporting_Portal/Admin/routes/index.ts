import React ,{lazy} from 'react'

import {ADMIN_OBSERVATIONS_LIST_PAGE_PATH} from '../constants/routeConstants/RouteConstants'
const AdminObservationsList = lazy(()=>import('./AdminObservationsListRoute/AdminObservationsListRoute'))

const AdminRoutes=[{path:ADMIN_OBSERVATIONS_LIST_PAGE_PATH,component:AdminObservationsList}]

export{AdminRoutes}