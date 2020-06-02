import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import { Typo32BrightBlueHKGroteskMedium, Typo14WhiteHKGroteskSemiBold } from '../../../../common/styleGuide/Typos/index.js';

const UserObservationsListContainer = styled.div `${tw `flex flex-col justify-center items-center`}`;
const ListOfObservationsTextAndAddButton = styled.div `${tw `flex justify-between items-center my-12`}width:1238px;height:40px`;
const ListOfObservationsText = styled(Typo32BrightBlueHKGroteskMedium)
`width: 288px;
height:100%`;

const PlusAndAddNewDisplay = styled.div `${tw `flex items-center`}padding-top:1px;padding-bottom:1px;`;
const AddNewText = styled(Typo14WhiteHKGroteskSemiBold)
`width: 57px;
  height: 24px;
  padding-top:1px`;
const ObservationListFilter = styled.div `${tw `flex justify-end items-center mb-6`}width:1240px`;
export { UserObservationsListContainer, ObservationListFilter, ListOfObservationsTextAndAddButton, ListOfObservationsText, PlusAndAddNewDisplay, AddNewText };
