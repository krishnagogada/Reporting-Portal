import React,{lazy} from 'react';
import { Route } from 'react-router-dom';
// import LogIn from './LogInRoute'
const LogIn = lazy(()=>import('./LogInRoute'))

import { LOG_IN_PATH } from '../../constants/routeConstants/RouteConstants';

export const LogInRoute = <Route path = { LOG_IN_PATH } component = { LogIn }/>;
