import React from 'react'
import { Image } from '../Image/index.js'
import {
   ObservationCellContainer,
   Title,
   DateAndTime,
   PersonDetails,
   PersonNameAndMobileNumber,
   PersonName,
   PersonMobileNumber,
   Severty,
   ObservationStatus
} from './styledComponent.js'

class ObservationCell extends React.Component {
   render() {
      return (
         <ObservationCellContainer>
            <td>
               <Title>Cultural Deviations</Title>
            </td>
            <td>
               <DateAndTime>11/5/2020 at 12:15 PM</DateAndTime>
            </td>
            <td>
               <PersonDetails>
                  <Image
                     source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                     alt='gjfs'
                     width='32'
                     height='32'
                  />
                  <PersonNameAndMobileNumber>
                     <PersonName>Dinakar raju</PersonName>
                     <PersonMobileNumber>Ph: 9898989898</PersonMobileNumber>
                  </PersonNameAndMobileNumber>
               </PersonDetails>
            </td>
            <td>
               <Severty>HIGH</Severty>
            </td>
            <td>
               <ObservationStatus>Closed</ObservationStatus>
            </td>
            <td>
               <DateAndTime>11/5/2020 at 12:15 PM</DateAndTime>
            </td>
         </ObservationCellContainer>
      )
   }
}

export { ObservationCell }
// <ObservationCellContainer>
//                 <Title>Cultural Deviations</Title>
//                 <DateAndTime>11/5/2020 at 12:15 PM</DateAndTime>
//                 <PersonDetails>
//                     <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
//                                         alt='gjfs' width='32' height='32'/>
//                     <PersonNameAndMobileNumber>
//                         <PersonName>Dinakar raju</PersonName>
//                         <PersonMobileNumber>Ph: 9898989898</PersonMobileNumber>
//                     </PersonNameAndMobileNumber>
//                 </PersonDetails>
//                 <Severty>HIGH</Severty>
//                 <ObservationStatus>Closed</ObservationStatus>
//                 <DateAndTime>11/5/2020 at 12:15 PM</DateAndTime>
//             </ObservationCellContainer>
