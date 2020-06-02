import React from 'react'
import { Image } from '../Image/index.js'
import {
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
}
from './styledComponent.js';
import './index.css';

class ObservationCell extends React.Component {
   render() {
      const { observationDetails, onClickObservationCell, className } = this.props;
      return (
         <ObservationCellContainer onClick={onClickObservationCell} className={className}>
            
               <Title>{observationDetails.title}</Title>
               <DateAndTime>{observationDetails.reportedOn}</DateAndTime>
               
               <PersonDetails>
                  <Image
                     source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                     alt='user profile image' className={'personDetails-profile-image'}
                  />
                  <PersonNameAndMobileNumber>
                     <PersonName>{observationDetails.username}</PersonName>
                     <PersonMobileNumber>{observationDetails.mobileNumber}</PersonMobileNumber>
                  </PersonNameAndMobileNumber>
               </PersonDetails>
               
           <TableData>
               <SevertyContainer>
                  <Severty className={`${observationDetails.severity.toLowerCase()}-severity`}>{observationDetails.severity.toUpperCase()}</Severty>
               </SevertyContainer>
           </TableData>
           <TableData>
               <ObservationStatusContainer>
                  <ObservationStatus>{observationDetails.status}</ObservationStatus>
               </ObservationStatusContainer>
            </TableData>
               <DateAndTime>{observationDetails.dueDate}</DateAndTime>
            
            <MessageNotification>
               <Image source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/25193dcb-b81b-48a0-8ce4-ef53a4775749.svg'
                        className={'message-notification'} alt='message notification'/>
            </MessageNotification>
         </ObservationCellContainer>
      );
   }
}

export { ObservationCell };
