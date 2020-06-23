import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../../../common/Themes/Colors/index';
import { Typo18BrightBlueHKGroteskBold, Typo32BrightBlueHKGroteskMedium, Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../../common/styleGuide/Typos/index';

const RpObservationsListPageContainer = styled.div `${tw `flex flex-col justify-center items-center`}`;
const UserObservationsListContainer = styled.div `${tw `flex flex-col justify-center items-center`}`;
const AssignedToMeAndMyObservations = styled.div `${tw `flex justify-between items-center`}width:313px;
margin-left:525px`;

const ActiveandInactiveNav = styled(Typo18BrightBlueHKGroteskBold)
`${props=>({color:props.active?Colors.brightBlue:Colors.steel})}`;

const RpObservationListHeading = styled(Typo32BrightBlueHKGroteskMedium)
`${tw `mt-12 mb-6`}width:1240px`;

const ObservationListFilter = styled.div `${tw `flex justify-end items-center mb-6`}width:1240px`;
const FilterText = styled(Typo12DarkBlueGreyHKGroteskSemiBold)
`width: 40px;
  height: 16px;`;

export { UserObservationsListContainer, RpObservationsListPageContainer, AssignedToMeAndMyObservations, ActiveandInactiveNav, RpObservationListHeading, ObservationListFilter, FilterText };
