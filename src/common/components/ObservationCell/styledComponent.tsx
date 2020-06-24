import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import { Colors } from '../../Themes/Colors/index';
import { Typo14SteelHKGroteskRegular } from '../../styleGuide/Typos/index';

const ObservationCellContainer = styled.tr `
   ${tw``}
   height: 66px;
   border: 1px solid ${Colors.lightBlueGrey};
   background-color: white;
`;
const Title = styled.td `
   ${tw`text-xs text-center`}
   color:${Colors.steel};
   width:177px;
`;
const DateAndTime = styled.td `
   ${tw`text-center text-xs`}
   color:${Colors.steel};
   width:177px;
`;
const NotYetAssigned = styled.td `${tw `flex justify-center items-center`}width: 177px;
  height: 66px;`;

const PersonDetails = styled.td `
   ${tw`flex justify-center items-center`}
   width:177px;
`;
const PersonNameAndMobileNumber = styled.div `
   ${tw`flex flex-col pl-5`}
`;
const PersonName = styled.p `
   ${tw`text-s pt-3`}
   color:${Colors.steel};
   padding-bottom: 6px;
`;
const PersonMobileNumber = styled.p `
   ${tw`text-xs pb-2`}
   color:${Colors.steel}
`;
const SevertyContainer = styled.div `${tw `flex justify-center items-center`}`;
const Severty = styled.p `
   ${tw`text-base rounded-full text-center text-white text-center text-xs `}
   width:72px;
   height: 21px;`;
const ObservationStatusContainer = styled.div `${tw `flex justify-center `}`;
const ObservationStatus = styled.p `
   ${tw`h-4 rounded-full text-center`}
   width:95px;
   border: 1px solid ${Colors.darkBlue};
   font-size: 8px;
`;
const MessageNotification = styled.td `${tw `flex justify-center`}`;

const TableData = styled.td `${tw ``}width:177px`;

export {
   ObservationCellContainer,
   Title,
   DateAndTime,
   NotYetAssigned,
   PersonDetails,
   PersonNameAndMobileNumber,
   PersonName,
   PersonMobileNumber,
   SevertyContainer,
   Severty,
   ObservationStatusContainer,
   ObservationStatus,
   MessageNotification,
   TableData
};
