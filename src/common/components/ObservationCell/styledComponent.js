import styled from '@emotion/styled'
import tw from 'tailwind.macro'

const ObservationCellContainer = styled.tr`
   ${tw`flex justify-around items-center`}
   width:1240px;
   height: 66px;
   border: 1px solid #d7dfe9;
   background-color: rgba(215, 223, 233, 0.24);
`
const Title = styled.p`
   ${tw`text-xs`}
   color:#7e858e
`
const DateAndTime = styled.div`
   ${tw`flex justify-between text-xs`}
   color:#7e858e
`
const PersonDetails = styled.div`
   ${tw`flex items-center`}
`
const PersonNameAndMobileNumber = styled.div`
   ${tw`flex flex-col pl-10`}
`
const PersonName = styled.p`
   ${tw`text-xs pt-3`}
   color:#7e858e;
   padding-bottom: 6px;
`
const PersonMobileNumber = styled.p`
   ${tw`text-xs pb-2`}
   color:#7e858e
`
const Severty = styled.p`
   ${tw`text-base rounded-full text-center text-white pb-6 `}
   width:72px;
   height: 21px;
   background-color: #ff0b37;
`
const ObservationStatus = styled.p`
   ${tw`h-4 rounded-full text-center`}
   width:95px;
   border: 1px solid black;
   font-size: 8px;
`
export {
   ObservationCellContainer,
   Title,
   DateAndTime,
   PersonDetails,
   PersonNameAndMobileNumber,
   PersonName,
   PersonMobileNumber,
   Severty,
   ObservationStatus
}
