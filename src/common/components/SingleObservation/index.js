import React from 'react';
import Select from 'react-select';
import { FiChevronLeft } from 'react-icons/fi';
import strings from '../../i18n/strings.json';
import {
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
}
from './styledComponent.js';
import { RadioField } from '../RadioField/index.js';
import { PrimaryButton } from '../PrimaryButton/index.js';
import { SecondaryButton } from '../SecondaryButton/index.js';
import { DateAndTimePicker } from '../DateAndTimePicker/index.js';
import './index.css';
class SingleObservation extends React.Component {

    render() {

        const { type, onChangeStatus, onChangeAssignedTo, onClickSubmit, onChangeDateAndTimePicker, dueDateValue, onChangeRadio, observationDetails, onClickBack } = this.props;

        const options = [{ value: "milk", label: "milk" }, { value: "milk", label: "milk" }];

        return (
            <div>
            
                <ObservationAndChatNav>
                    <SecondaryActiveAndInactiveNav>{strings.observation}</SecondaryActiveAndInactiveNav>
                    <SecondaryActiveAndInactiveNav>{strings.chat}</SecondaryActiveAndInactiveNav>
                </ObservationAndChatNav>
                
                <AssignedObservationInnerContainer>
                
                    <TitleHeading><FiChevronLeft className={'back-icon'} onClick={onClickBack}/>{observationDetails.title}</TitleHeading>
                    
                    <DescriptionField>
                        <Description>{observationDetails.description}</Description>
                    </DescriptionField>
                    
                    <CateogaryAndSubCateogaryField>
                        <CateogaryText>{strings.category}</CateogaryText>
                        <Select className={'medium-select'} 
                                isDisabled={true} 
                                placeholder={observationDetails.category}
                            />
                        <SubCateogaryText>{strings.subCategory}</SubCateogaryText>
                        <Select isDisabled={true} placeholder={observationDetails.subCategory} className={'medium-select'}/>
                    </CateogaryAndSubCateogaryField>
                    
                    <StatusField>
                        <StatusText>{strings.status}</StatusText>
                        <Select options={options} 
                                className={'small-select'} 
                                isDisabled={type===strings.rp?false:true} 
                                onChange={onChangeStatus} 
                                placeholder={observationDetails.status}
                            />
                    </StatusField>
                    
                    <SeverityField>
                        <SeverityText>{strings.severity}</SeverityText>
                        <Select options={options} 
                                className={'small-select'} 
                                isDisabled={true} 
                                placeholder={observationDetails.severity}
                            />
                    </SeverityField>
                    
                    <AttachmentsField>
                        <AttachmentsText>{strings.attachements}</AttachmentsText>
                    </AttachmentsField>
                    
                    <AssignedToField>
                        <AssignedToText>{strings.assignedTo}</AssignedToText>
                        <Select options={options} 
                                className={'medium-select'} 
                                isDisabled={type===strings.rp?false:true} 
                                onChange={onChangeAssignedTo} 
                                placeholder={observationDetails.username}
                            />
                    </AssignedToField>
                    
                    <ReportedOnField>
                        <ReportedText>{strings.reportedOn}</ReportedText>
                        <Select options={options} 
                                className={'large-select'} 
                                isDisabled={true} 
                                placeholder={observationDetails.reportedOn}
                            />
                    </ReportedOnField>
                    
                    <DueDateField>
                        <DueDateText>{strings.dueDate}</DueDateText>
                        <DateAndTimePicker  onChangeDateAndTimePicker={onChangeDateAndTimePicker} 
                                            value={dueDateValue} 
                                            isDisabled={type===strings.rp?false:true} 
                                            placeholder={observationDetails.dueDate}
                                        />
                    </DueDateField>
                    {type===strings.rp?<SecurityField><RadioField options={['PUBLIC','PRIVATE']} name='security' onChangeRadio={onChangeRadio}/></SecurityField>:null}
                    
                    <ResetAndUpdateButtons>
                        <SecondaryButton className={'reset-button'}>{strings.reset}</SecondaryButton>
                        <PrimaryButton onClickButton={onClickSubmit}>{strings.update}</PrimaryButton>
                    </ResetAndUpdateButtons>
                </AssignedObservationInnerContainer>
            </div>
        );
    }
}

export { SingleObservation }
