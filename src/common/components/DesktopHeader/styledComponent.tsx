import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Colors } from '../../Themes/Colors/index';
import {
   Typo18DarkBlueGrayHKGroteskMedium,
   Typo24DarkBlueGreyHKGroteskMedium
}
from '../../styleGuide/Typos/index';

const HeaderContainer = styled.div `
   ${tw`flex justify-between w-screen`};
   height: 80px;
   border: 1px solid ${Colors.lightBlueGrey};
`;
const CompanyLogoAndAppName = styled.div `
   ${tw`flex items-center pl-8`}
`;
const AppName = styled(Typo24DarkBlueGreyHKGroteskMedium)
`${tw `pl-8`}`;
const UserNameAndProfileImage = styled.div `
   ${tw`flex items-center justify-between mr-8`}
`;
const UserProfileName = styled(Typo18DarkBlueGrayHKGroteskMedium)
`width:45px;height:24px;margin-right:24px`;

export { HeaderContainer, CompanyLogoAndAppName, AppName, UserProfileName, UserNameAndProfileImage };
