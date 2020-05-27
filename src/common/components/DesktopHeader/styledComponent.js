import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import {
   Typo18DarkBlueGrayHKGroteskMedium,
   Typo24DarkBlueGreyHKGroteskMedium
} from '../../styleGuide/Typos/index.js'

const HeaderContainer = styled.div`
   ${tw`flex justify-between `}width: 1440px;
   height: 80px;
   border: 1px solid #d7dfe9;
`
const CompanyLogoAndAppName = styled.div`
   ${tw`flex items-center pl-8`}
`
// const AppName = styled.p `${tw `pl-8`}`;
// const AppName = styled(Typo24DarkBlueGreyHKGroteskMedium);
const UserNameAndProfileImage = styled.div`
   ${tw`flex items-center justify-between pr-8`}
`

// const UserName = styled(Typo18DarkBlueGrayHKGroteskMedium)
// `width:45px;height:24px;padding-right:24px`;

export { HeaderContainer, CompanyLogoAndAppName, UserNameAndProfileImage }
