import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Typo32DarkBlueGreyRubikRegular, Typo12SteelHKGroteskSemiBold, Typo14DarkBlueGreyHKGroteskRegular } from '../../../../common/styleGuide/Typos/index.js';

const LogInContainer = styled.div `${tw `flex justify-center items-center h-screen bg-gray-200`}`;
const LogInForm = styled.div `${ tw `flex flex-col items-center pt-12 bg-white`}width:536px;height:687px`;
const LogInHeading = styled(Typo32DarkBlueGreyRubikRegular)
`width: 214px;
  height: 80px;
  margin-top:24px
  margin-bottom:24px`;
const CreateAccount = styled(Typo14DarkBlueGreyHKGroteskRegular)
`width: 200px;
  height: 24px;`;
const SignUpLink = styled.span `${tw `text-blue-900`}`;
export { LogInForm, LogInContainer, LogInHeading, CreateAccount, SignUpLink };
