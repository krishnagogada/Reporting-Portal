import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';
import { Image } from '../Image/index.js';
import strings from '../../i18n/strings.json';
import {
   HeaderContainer,
   CompanyLogoAndAppName,
   AppName,
   UserProfileName,
   UserNameAndProfileImage,

}
from './styledComponent.js';
import './index.css';
import { RpNavSwitchers } from '../RpNavSwitchers';

@inject('authStore')
@observer
class DesktopHeader extends React.Component {

   @observable inActive = strings.assignedToMe

   onClickRpNavSwitcher = (activeNav) => {
      this.inActive = activeNav;
      const { history } = this.props;

      if (activeNav === strings.assignedToMe) {

         history.push('/rp-observations-list');
      }
      else {
         history.push('/user-observations-list');
      }
   }

   render() {
      const type = this.props.authStore.type;
      return (
         <HeaderContainer>
            <CompanyLogoAndAppName>
               <Image
                  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/debc388f-cec6-45b7-b06f-491ec3d68009.svg'
                  alt={strings.ibhubsLogo} className={'company-logo'}/>
               <AppName>{strings.reportingPortal}</AppName>
            </CompanyLogoAndAppName>
            {type===strings.rp?<RpNavSwitchers   onClickRpNavSwitcher={this.onClickRpNavSwitcher}
                                                   inActive={this.inActive}/>:null}
            <UserNameAndProfileImage>
               <UserProfileName>vamsi</UserProfileName>
               <Image
                  source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/a2aef3cf-5632-4015-9ea6-4ac3703d9c24@3x.png'
                  alt={strings.userProfileImage} className={'user-profile-image'}/>
            </UserNameAndProfileImage>
         </HeaderContainer>
      );
   }
}

export default withRouter(DesktopHeader);
