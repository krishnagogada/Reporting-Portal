import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../../../common/Themes/Colors/index.js';
import { Typo18BrightBlueHKGroteskBold } from '../../../../common/styleGuide/Typos/index.js';

const AssignedObservationOuterContainer = styled.div `${tw `flex justify-center items-center flex-col`}`;

const AssignedToMeAndMyObservations = styled.div `${tw `flex justify-between items-center`}width:313px;
margin-left:525px`;

const PrimaryActiveAndInactiveNav = styled(Typo18BrightBlueHKGroteskBold)
`${props=>({color:props.active?Colors.brightBlue:Colors.steel})}`;


export {
  AssignedObservationOuterContainer,
  AssignedToMeAndMyObservations,
  PrimaryActiveAndInactiveNav
};
