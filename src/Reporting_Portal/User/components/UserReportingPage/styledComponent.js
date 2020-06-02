import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import { Colors } from '../../../../common/Themes/Colors/index.js';
import { Typo14SteelHKGroteskRegular, Typo12DarkBlueGreyRubikMedium, Typo12HKGroteskRegular } from '../../../../common/styleGuide/Typos/index.js';

const UserReportingPageOuterContainer = styled.div `${tw `flex justify-center items-center flex-col`}
width:1440px
background-color:${Colors.whiteTwo}`;

const UserReportingPageInnerContainer = styled.div `${tw `flex flex-col mt-8 mb-10 rounded bg-white`}
width:1131px;
border:1px solid ${Colors.lightBlueGrey};`;

const BackToObservationList = styled.div `${tw `flex flex-start items-center`}margin-top:34px;margin-left:56px`;
const BackToObservationListText = styled(Typo14SteelHKGroteskRegular)
`${tw `cursor-pointer`}width: 133px;
  height: 24px;`;

const TitleObservationFieldAndLabel = styled.div `${tw `flex items-center`}margin-top:34px;`;
const TitleOfObservationText = styled(Typo12DarkBlueGreyRubikMedium)
`${tw `flex`}width: 165px;
  height: 24px;
  margin-right:42px;
  margin-left:80px;
`;

const CategoryAndSubCategoryWithFieldAndLabel = styled.div `${tw `flex items-center mt-12`}`;

const CategoryText = styled(Typo12DarkBlueGreyRubikMedium)
`width: 72px;
  height: 24px;
  margin-right:135px;
  margin-left:80px`;

const SubCategoryText = styled(Typo12DarkBlueGreyRubikMedium)
`${tw `mr-6`}width: 100px;
margin-left:125px;
height: 24px;`;

const SeverityFieldAndLabel = styled.div `${tw `flex items-center mt-12`}`;

const SeverityText = styled(Typo12DarkBlueGreyRubikMedium)
`${tw `flex`}width: 59px;
  height: 24px;
  margin-right:148px;
  margin-left:80px;`;

const DescriptionAndTextAreaField = styled.div `${tw `flex items-center mt-12`}`;

const DescriptionText = styled(Typo12DarkBlueGreyRubikMedium)
`${tw `flex`}width: 81px;
  height: 24px;
  margin-right:126px;
  margin-left:80px;`;

const UploadField = styled.div `${tw `flex items-center mt-12`}`;
const AttachementsText = styled(Typo12DarkBlueGreyRubikMedium)
`margin-right:100px;
margin-left:80px;`;

const ErrorMessage = styled(Typo12HKGroteskRegular)
`color:${Colors.neonRed};
margin-left:5px`;

const RequiredField = styled.span `${tw `text-red-600 ml-1`}`;

export {
  UserReportingPageOuterContainer,
  UserReportingPageInnerContainer,
  BackToObservationList,
  BackToObservationListText,
  TitleObservationFieldAndLabel,
  TitleOfObservationText,
  CategoryAndSubCategoryWithFieldAndLabel,
  CategoryText,
  SubCategoryText,
  SeverityFieldAndLabel,
  SeverityText,
  DescriptionAndTextAreaField,
  DescriptionText,
  UploadField,
  AttachementsText,
  ErrorMessage,
  RequiredField
};
