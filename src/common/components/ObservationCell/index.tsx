import React from 'react'

import { Image } from '../Image/index'
import { Typo14SteelHKGroteskRegular } from '../../styleGuide/Typos/index';
import strings from '../../i18n/strings.json';

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
from './styledComponent';
import './index.css';

type observationCellProps={
   observationDetails:any
   onClickObservationCell:(observationId:number)=>void
   className:any
   roleType:string
}

class ObservationCell extends React.Component<observationCellProps>{

   render() {
      const { observationDetails, onClickObservationCell, className, roleType } = this.props;
      return (
         <ObservationCellContainer data-testid='observation-cell' onClick={()=>onClickObservationCell(observationDetails.observationId)} className={className}>
            
               <Title>{observationDetails.title}</Title>
                  {roleType!==strings.admin?
                  <DateAndTime>{observationDetails.reportedOn}</DateAndTime>:
                  <PersonDetails>
                     <Image
                     source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                     alt='user profile image' className={'personDetails-profile-image'}
                     />
                     <PersonNameAndMobileNumber>
                        <PersonName>{observationDetails.reportedByName}</PersonName>
                        <PersonMobileNumber>{observationDetails.reportedByMobileNumber}</PersonMobileNumber>
                     </PersonNameAndMobileNumber>
                  </PersonDetails>
               }
               
               {roleType!==strings.admin?
                     observationDetails.personDetails==='RP not assigned'?
                           <NotYetAssigned><Typo14SteelHKGroteskRegular>{observationDetails.personDetails}</Typo14SteelHKGroteskRegular></NotYetAssigned>:
                           
               <PersonDetails>
                  <Image
                     source={observationDetails.profilePic}
                     alt='user profile image' className={'personDetails-profile-image'}
                  />
                  <PersonNameAndMobileNumber>
                     <PersonName>{observationDetails.username}</PersonName>
                     <PersonMobileNumber>{observationDetails.mobileNumber}</PersonMobileNumber>
                  </PersonNameAndMobileNumber>
               </PersonDetails>:null
               
               }
               
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
            
            {roleType===strings.admin?
               <PersonDetails>
                  <Image
                     source='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/867a98d4-d61b-45cf-89cc-0a50a9dddb38@3x.png'
                     alt='user profile image' className={'personDetails-profile-image'}
                  />
                  <PersonNameAndMobileNumber>
                     <PersonName>{observationDetails.assignedToName}</PersonName>
                     <PersonMobileNumber>{observationDetails.assignedToMobileNumber}</PersonMobileNumber>
                  </PersonNameAndMobileNumber>
               </PersonDetails>:null}
               
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