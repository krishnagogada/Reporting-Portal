import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index.js';
import {
   Typo12SteelHKGroteskSemiBold,
   Typo12NeonRedHKGroteskRegular
}
from '../../styleGuide/Typos/index.js';

const InputFieldLabelAndErrorMessage = styled.div `
   ${tw`flex flex-col mb-6`}
`;
const InputFieldLabel = styled(Typo12SteelHKGroteskSemiBold)
`
   width: 66px;
   height: 16px;
   padding-bottom: 8px;
`;
const ErrorMessageDisplay = styled(Typo12NeonRedHKGroteskRegular)
`
   width: 124px;
   height: 16px;
   color:${Colors.neonRed}
`;

export { InputFieldLabelAndErrorMessage, InputFieldLabel, ErrorMessageDisplay };
