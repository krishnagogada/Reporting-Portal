import React from 'react';
import { Image } from '../Image/index.js';
import strings from '../../i18n/strings.json';
import { HeaderContainer, CompanyLogoAndAppName, AppName, UserNameAndProfileImage, UserName } from './styledComponent.js';
import { Typo18DarkBlueGrayHKGroteskMedium, Typo24DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos/index.js';

class DesktopHeader extends React.Component {
    render() {
        return (
            <HeaderContainer>
                <CompanyLogoAndAppName>
                    <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/debc388f-cec6-45b7-b06f-491ec3d68009.svg' 
                            alt={strings.ibhubsLogo} width='90' height='90'/>
                    <Typo24DarkBlueGreyHKGroteskMedium>{strings.reportingPortal}</Typo24DarkBlueGreyHKGroteskMedium>
                </CompanyLogoAndAppName>
                <UserNameAndProfileImage>
                    <Typo18DarkBlueGrayHKGroteskMedium>vamsi</Typo18DarkBlueGrayHKGroteskMedium>
                    <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/a2aef3cf-5632-4015-9ea6-4ac3703d9c24@3x.png' 
                            alt={strings.userProfileImage} width='48' height='48'/>
                </UserNameAndProfileImage>
            </HeaderContainer>
        );
    }
}

export { DesktopHeader };
