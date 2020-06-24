import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { History } from 'history'

import { LOG_IN_PATH } from '../../../Reporting_Portal/Authentication/constants/routeConstants/RouteConstants';
import AuthStore from '../../../Reporting_Portal/Authentication/stores/AuthStore/index'

import { Image } from '../Image/index';
import strings from '../../i18n/strings.json';
import { RpNavSwitchers } from '../RpNavSwitchers';
import { AdminNavSwitchers } from '../AdminNavSwitchers';


import {
   HeaderContainer,
   CompanyLogoAndAppName,
   AppName,
   UserProfileName,
   UserNameAndProfileImage,

}
from './styledComponent';
import './index.css';

type DesktopHeaderProps={
   history:History
   authStore:AuthStore
   roleType:string
}

@inject('authStore')
@observer
class DesktopHeader extends React.Component<DesktopHeaderProps> {

   onClickRpNavSwitcher = (activeNav:string) => {

      const { history } = this.props;

      switch (activeNav) {
         case strings.assignedToMe:
            history.push({ pathname: '/rp-observations-list', state: { roleType: 'rp' } });
            break;
         case strings.myObservations:
            history.push({ pathname: '/user-observations-list', state: { roleType: 'user' } });
            break;
         case strings.totalObservations:
            history.push({ pathname: '/admin-observations-list', state: { roleType: 'admin' } });
            break;
      }
   }

   onClickSignOut = () => {
      const { authStore, history } = this.props;
      authStore.userLogOut();
      history.replace(LOG_IN_PATH);
   }

   render() {
      const { roleType } = this.props;

      return (
         <HeaderContainer>
            <CompanyLogoAndAppName>
               <Image
                  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/debc388f-cec6-45b7-b06f-491ec3d68009.svg'
                  alt={strings.ibhubsLogo} className={'company-logo'}/>
               <AppName>{strings.reportingPortal}</AppName>
            </CompanyLogoAndAppName>
            
            {roleType===strings.rp?<RpNavSwitchers onClickRpNavSwitcher={this.onClickRpNavSwitcher}/>: 
            roleType===strings.admin? <AdminNavSwitchers onClickRpNavSwitcher={this.onClickRpNavSwitcher}/>:
            null}
            
            <UserNameAndProfileImage>
               <UserProfileName>vamsi</UserProfileName>
               <Image
                  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/a2aef3cf-5632-4015-9ea6-4ac3703d9c24@3x.png'
                  alt={strings.userProfileImage} className={'user-profile-image'} onClickImage={this.onClickSignOut} dataId='sign-out'/>
            </UserNameAndProfileImage>
         </HeaderContainer>
      );
   }
}

export default withRouter(DesktopHeader);
