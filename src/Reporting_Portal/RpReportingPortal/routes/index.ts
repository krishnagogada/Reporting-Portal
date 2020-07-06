import React ,{lazy} from 'react'

import {RP_OBSERVATIONS_LIST_PAGE_PATH} from '../constants/routeConstants/RouteConstants'
const RpAssignedObservationsListPage = lazy(()=>import('./RpAssignedObservationsListPageRoute/RpAssignedObservationsListPageRoute'))

const RpRoutes=[{path:RP_OBSERVATIONS_LIST_PAGE_PATH,component:RpAssignedObservationsListPage}];

export {RpRoutes}