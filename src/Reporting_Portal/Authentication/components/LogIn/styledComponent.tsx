import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../../../common/Themes/Colors/index';
import {
    Typo32DarkBlueGreyRubikRegular,
    Typo14DarkBlueGreyHKGroteskRegular,
    Typo12HKGroteskRegular
}
from '../../../../common/styleGuide/Typos/index';

const LogInContainer = styled.div `
   ${tw`flex justify-center items-center h-screen bg-gray-200`}
`;
const LogInForm = styled.div `
   ${tw`flex flex-col items-center pt-12 bg-white`}width: 536px;
   height: 687px;
`;
const HeadingText = styled(Typo32DarkBlueGreyRubikRegular)
`width: 214px;
  height: 80px;
  margin-top:24px;
 margin-bottom:24px`;
const CreateAccount = styled.div `${tw `flex items-center text-sm`}`;
const ErrorMessage = styled(Typo12HKGroteskRegular)
`width: 124px;
 height: 16px;
 margin-top:-20px;
 color:${Colors.neonRed}`;

const SignUpLink = styled(Typo14DarkBlueGreyHKGroteskRegular)
`margin-left:5px;`;


export { LogInForm, LogInContainer, HeadingText, CreateAccount, ErrorMessage, SignUpLink };
