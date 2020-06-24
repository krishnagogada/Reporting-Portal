import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Colors } from '../../Themes/Colors/index';
import { Typo12DarkBlueGreyHKGroteskSemiBold, Typo24DarkBlueGreyHKGroteskMedium, Typos16darkBlueGreyHKGroteskLight, Typo12DarkBlueGreyRubikMedium } from '../../styleGuide/Typos/index';

const ObservationAndChatNav = styled.div `${tw `flex`}border-bottom:1px solid ${Colors.lightBlueGrey};width:1128px;margin-top:34px`;
const SecondaryActiveAndInactiveNav = styled(Typo12DarkBlueGreyHKGroteskSemiBold)
`margin-right:27px`;

const AssignedObservationInnerContainer = styled.div `${tw `flex flex-col rounded py-6 mt-6`}width:1131px;border:1px solid ${Colors.lightBlueGrey}`;
const TitleHeading = styled(Typo24DarkBlueGreyHKGroteskMedium)
`${tw `flex items-center`}width: 208px;
  height: 32px;
  margin-bottom:8px;
  margin-left:80px`;

const DescriptionField = styled.div `${tw `py-2 mb-12`}width:971px;border:1px solid ${Colors.lightBlueGrey};margin-left:80px`;

const Description = styled(Typos16darkBlueGreyHKGroteskLight)
`width:971px;
padding-left:22px;
padding-right:22px`;

const CateogaryAndSubCateogaryField = styled.div `${tw `flex items-center mb-12`}`;

const CateogaryText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:47px;
margin-left:80px`;

const SubCateogaryText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:22px;
margin-left:35px`;

const StatusField = styled.div `${tw `flex items-center mb-12`}`;

const StatusText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:73px;
margin-left:80px`;

const SeverityField = styled.div `${tw `flex items-center mb-12`}`;

const SeverityText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:60px;margin-left:80px`;

const AttachmentsField = styled.div `${tw `flex items-center mb-12`}`;

const AttachmentsText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:30px;margin-left:80px`;

const AssignedToField = styled.div `${tw `flex items-center mb-12`}`;

const AssignedToText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:39px;margin-left:80px`;

const ReportedOnField = styled.div `${tw `flex items-center mb-12`}`;

const ReportedText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:35px;margin-left:80px`;

const DueDateField = styled.div `${tw `flex items-center`}margin-bottom:19px`;

const DueDateText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:60px;margin-left:80px`;

const SecurityField = styled.div `${tw `flex mb-12`}margin-left:196px`;

const ResetAndUpdateButtons = styled.div `${tw `flex justify-center`}`;

export {
  ObservationAndChatNav,
  SecondaryActiveAndInactiveNav,
  AssignedObservationInnerContainer,
  TitleHeading,
  DescriptionField,
  Description,
  CateogaryAndSubCateogaryField,
  CateogaryText,
  SubCateogaryText,
  StatusField,
  StatusText,
  SeverityField,
  SeverityText,
  AttachmentsField,
  AttachmentsText,
  AssignedToField,
  AssignedToText,
  ReportedOnField,
  ReportedText,
  DueDateField,
  DueDateText,
  SecurityField,
  ResetAndUpdateButtons
};
