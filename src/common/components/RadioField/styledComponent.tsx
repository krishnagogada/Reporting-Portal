import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Typo12DarkBlueGreyRubikMedium } from '../../styleGuide/Typos/index.js';

const RadioFieldContainer = styled.div `${tw `flex items-center`}`;
const LabelName = styled(Typo12DarkBlueGreyRubikMedium)
`${tw `ml-3 mr-8`}`;

export { RadioFieldContainer, LabelName };
